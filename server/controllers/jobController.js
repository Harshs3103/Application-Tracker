import prisma from "../prisma.js";
import { jobSchema, updateJobSchema } from "../validators.js";

export const createJob = async (req, res) => {
  try {
    const result = jobSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }

    const job = await prisma.job.create({
      data: { ...result.data, userId: req.userId },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { userId: req.userId },
      orderBy: { appliedDate: "desc" },
    });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export const updateJob = async (req, res) => {
  try {
    const jobId = Number(req.params.id);
    if (Number.isNaN(jobId)) {
      return res.status(400).json({ error: "Invalid job id" });
    }

    const result = updateJobSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }

    const job = await prisma.job.findFirst({
      where: { id: jobId, userId: req.userId },
    });
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const updated = await prisma.job.update({
      where: { id: jobId },
      data: result.data,
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = Number(req.params.id);
    if (Number.isNaN(jobId)) {
      return res.status(400).json({ error: "Invalid job id" });
    }

    const job = await prisma.job.findFirst({
      where: { id: jobId, userId: req.userId },
    });
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    await prisma.job.delete({ where: { id: jobId } });

    res.json({ message: "Job deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};