import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import type { Course } from '../types';
import { fetchCourses, fetchCourseDetails } from '../api/courses';

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCourses() as any;
      setCourses(data.results || data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to fetch courses';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return { courses, loading, error, reload: loadCourses };
};

export const useCourseDetails = (id: number) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadCourse = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCourseDetails(id);
      setCourse(data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to fetch course details';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourse();
  }, [id]);

  return { course, loading, error, reload: loadCourse };
};
