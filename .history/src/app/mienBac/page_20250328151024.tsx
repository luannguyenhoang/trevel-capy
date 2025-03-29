"use client";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import { useEffect, useState } from "react";
import Loading from "../components/molecules/Loading";
import { ScrollAnimation } from "../components/molecules/ScrollAnimation";
import Titles from "../components/molecules/Title";
import Containers from "../components/organisms/Content";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/mien-bac`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function MienBac() {
  const data = await getData();
  
  
  return (
    <>
      <ScrollAnimation delay={0.3}>
        <Titles session1={data[0]?.acf.title as TitlesMienBac} />
      </ScrollAnimation>

      <Containers
        slug={data[0]?.type}
        session2={data[0]?.acf.mien_bac_content as MienBacContent}
      />
    </>
  );
}
