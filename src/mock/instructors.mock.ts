export interface Instructor {
  id: string;
  name: string;
}

export const instructorsMock: Instructor[] = [
  { id: "1", name: "Dr. Sarah Johnson" },
  { id: "2", name: "Prof. Michael Chen" },
  { id: "3", name: "Ms. Emily Williams" },
  { id: "4", name: "Dr. James Anderson" },
  { id: "5", name: "Mrs. Lisa Martinez" },
];

export const getInstructors = (): Instructor[] => {
  return instructorsMock;
};

export const getInstructorById = (id: string): Instructor | undefined => {
  return instructorsMock.find(i => i.id === id);
};
