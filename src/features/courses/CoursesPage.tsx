import { useCourses } from "../../hooks/useCourses";
import FilterBar, { type FilterType } from "../../components/ui/FilterBar";
import CoursesGrid from "./CoursesGrid";
import { motion } from "framer-motion";
import emptyCoursesImg from "../../assets/Frame.png";

const CoursesPage = () => {
  const { filteredCourses, loading, filter, setFilter } = useCourses();

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pb-20">
      <div className="mb-6 sm:mb-8 mt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-2 tracking-tight">My Courses</h1>
        <p className="text-slate-500 font-medium text-base sm:text-lg">
          You have <span className="text-[#1600D5] font-extrabold">{filteredCourses.length} active courses</span> this semester
        </p>
      </div>

      <FilterBar activeFilter={filter} onFilterChange={handleFilterChange} />

      {filteredCourses.length > 0 ? (
        <CoursesGrid courses={filteredCourses} />
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center py-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-center text-gray-600 mb-4">
            No courses found<br />
            Try changing your filter or check back later.
          </p>
          <img
            src={emptyCoursesImg}
            alt="No courses found"
            className="w-full max-w-xl h-auto opacity-90"
          />
        </motion.div>
      )}
    </div>
  );
};

export default CoursesPage;
