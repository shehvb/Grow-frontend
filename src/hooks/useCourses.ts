import { useState, useEffect, useMemo } from "react";
import type { Course as UICourse } from "../types";
import type { FilterType } from "../components/ui/FilterBar";
import { useCourseStore } from "../store/useCourseStore";
import { filterCourses } from "../features/courses/courseFilters";

export const useCourses = () => {
  const { courses: apiCourses, isLoading, listCourses } = useCourseStore();
  const [filter, setFilter] = useState<FilterType>("all");
  
  useEffect(() => {
    listCourses();
  }, [listCourses]);
  
  // Map API Course to UI Course format
  const courses: UICourse[] = useMemo(() => {
    return apiCourses.map(c => ({
      id: c.id.toString(),
      title: c.title,
      instructor: {
        id: c.teacher?.id?.toString() || '0',
        name: c.teacher?.username || `Teacher ${c.teacher?.id || 'Unknown'}`,
      },
      progress: 0,
      status: "not_started",
      lessonsCount: 0,
    }));
  }, [apiCourses]);
  
  const filteredCourses = useMemo(() => {
    return filterCourses(courses, filter);
  }, [courses, filter]);
  
  return {
    courses,
    filteredCourses,
    loading: isLoading,
    filter,
    setFilter,
  };
};
