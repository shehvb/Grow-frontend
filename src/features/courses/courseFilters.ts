import type { Course } from "../../types";
import type { FilterType } from "../../components/ui/FilterBar";

export const filterCourses = (courses: Course[], filter: FilterType): Course[] => {
  if (filter === "all") {
    return courses;
  }
  
  if (filter === "in_progress") {
    return courses.filter((course) => 
      course.status === "in_progress" || course.status === "not_started"
    );
  }
  
  return courses.filter((course) => course.status === filter);
};
