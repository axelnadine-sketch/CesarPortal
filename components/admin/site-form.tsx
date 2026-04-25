"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";
import type { SiteFormActionState } from "@/types/site-form";

type SiteFormValues = {
  name: string;
  slug: string;
  url: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  tags: string;
  imageUrl: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
};

type SiteFormProps = {
  action: (
    state: SiteFormActionState,
    formData: FormData,
  ) => Promise<SiteFormActionState>;
  initialState: SiteFormActionState;
  submitLabel: string;
  values: SiteFormValues;
  siteId?: string;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? "Enregistrement..." : label}
    </Button>
  );
}

export function SiteForm({
  action,
  initialState,
  submitLabel,
  values,
  siteId,
}: SiteFormProps) {
  const [state, formAction] = useActionState(action, initialState);
  const [name, setName] = useState(values.name);
  const [slug, setSlug] = useState(values.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(values.slug));

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(name));
    }
  }, [name, slugTouched]);

  const computedSlugHint = useMemo(() => slugify(name), [name]);

  return (
    <form action={formAction} className="grid gap-6">
      {siteId ? <input name="siteId" type="hidden" value={siteId} /> : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <FormField error={state.errors?.name} htmlFor="name" label="Nom">
          <Input
            id="name"
            name="name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Studio Atlas"
            required
            value={name}
          />
        </FormField>

        <FormField
          error={state.errors?.slug}
          hint={computedSlugHint && computedSlugHint !== slug ? `Suggestion: ${computedSlugHint}` : undefined}
          htmlFor="slug"
          label="Slug"
        >
          <Input
            id="slug"
            name="slug"
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(event.target.value);
            }}
            placeholder="studio-atlas"
            required
            value={slug}
          />
        </FormField>

        <FormField error={state.errors?.url} htmlFor="url" label="URL du site">
          <Input defaultValue={values.url} id="url" name="url" placeholder="https://exemple.com" required />
        </FormField>

        <FormField error={state.errors?.imageUrl} htmlFor="imageUrl" label="Image URL">
          <Input
            defaultValue={values.imageUrl}
            id="imageUrl"
            name="imageUrl"
            placeholder="https://..."
            required
          />
        </FormField>

        <FormField error={state.errors?.category} htmlFor="category" label="Categorie">
          <Input defaultValue={values.category} id="category" name="category" placeholder="Business" required />
        </FormField>

        <FormField
          error={state.errors?.sortOrder}
          hint="Plus la valeur est basse, plus le site remonte."
          htmlFor="sortOrder"
          label="Ordre d'affichage"
        >
          <Input defaultValue={values.sortOrder} id="sortOrder" min={0} name="sortOrder" required type="number" />
        </FormField>
      </div>

      <FormField error={state.errors?.shortDescription} htmlFor="shortDescription" label="Description courte">
        <Textarea
          defaultValue={values.shortDescription}
          id="shortDescription"
          name="shortDescription"
          placeholder="Resume clair et court du site."
          required
        />
      </FormField>

      <FormField
        error={state.errors?.longDescription}
        hint="Optionnel, utile pour une fiche detail ou une automatisation future."
        htmlFor="longDescription"
        label="Description longue"
      >
        <Textarea
          defaultValue={values.longDescription}
          id="longDescription"
          name="longDescription"
          placeholder="Description plus complete du site."
        />
      </FormField>

      <FormField
        error={state.errors?.tags}
        hint="Separez les tags par des virgules."
        htmlFor="tags"
        label="Tags"
      >
        <Input defaultValue={values.tags} id="tags" name="tags" placeholder="branding, seo, media" />
      </FormField>

      <div className="flex flex-wrap gap-6 rounded-[1.75rem] border border-[#2d2d30] bg-[#2d2d30] p-5">
        <label className="flex items-center gap-3 text-sm text-white/80">
          <Checkbox defaultChecked={values.isActive} id="isActive" name="isActive" />
          Site actif
        </label>
        <label className="flex items-center gap-3 text-sm text-white/80">
          <Checkbox defaultChecked={values.isFeatured} id="isFeatured" name="isFeatured" />
          Site mis en avant
        </label>
      </div>

      {state.errors?._form ? <p className="text-sm text-rose-300">{state.errors._form}</p> : null}

      <div className="flex justify-end">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
