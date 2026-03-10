export interface Feature {
  icon: string;
  title: string;
  desc: string;
  bgColor: string;
  borderHover: string;
}

export interface Step {
  num: string;
  title: string;
  desc: string;
  grad: string;
}

export interface SecurityProtocol {
  icon: string;
  title: string;
  desc: string;
  status: string;
}

export interface Stat {
  val: string;
  suffix: string;
  label: string;
}

export interface SubjectProgress {
  label: string;
  pct: number;
  color: string;
}

export interface AudienceCard {
  tag: string;
  tagColor: string;
  illustration: string;
  bgGrad: string;
  dotColor: string;
  title: string;
  items: string[];
}
