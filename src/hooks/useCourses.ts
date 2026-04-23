import { useState, useEffect, useMemo } from "react";
import type { Course } from "../types";
import type { FilterType } from "../components/ui/FilterBar";
import { courseService } from "../services/courseService";
import { filterCourses } from "../features/courses/courseFilters";

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const data = await courseService.getAllCourses();
      setCourses(data);
      setLoading(false);
    };
    
    loadCourses();
  }, []);
  
  const filteredCourses = useMemo(() => {
    return filterCourses(courses, filter);
  }, [courses, filter]);
  
  return {
    courses,
    filteredCourses,
    loading,
    filter,
    setFilter,
  };
};
