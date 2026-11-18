import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecordForm } from "@/components/forms/record-form";
import { FORM_IDS, forms, isFormId } from "@/constants/forms";

type FormPageProps = {
  params: Promise<{ formId: string }>;
};

export function generateStaticParams() {
  return FORM_IDS.map((formId) => ({ formId }));
}

export async function generateMetadata({
  params,
}: FormPageProps): Promise<Metadata> {
  const { formId } = await params;
  if (!isFormId(formId)) {
    return { title: "Форма" };
  }

  return { title: forms[formId].title };
}

export default async function FormPage({ params }: FormPageProps) {
  const { formId } = await params;
  if (!isFormId(formId)) {
    notFound();
  }

  return <RecordForm formId={formId} />;
}
