import type { ComponentType } from "react";
import learn1 from "../../assets/learn1.png"

export interface Feature {
  icon: string | ComponentType;
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
  image: typeof learn1;
  tag: string;
  tagColor: string;
  illustration: string;
  bgGrad: string;
  dotColor: string;
  title: string;
  items: string[];
}
