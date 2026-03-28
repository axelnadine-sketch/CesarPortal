export type SiteFormActionState = {
  success: boolean;
  message?: string;
  errors?: {
    name?: string;
    slug?: string;
    url?: string;
    shortDescription?: string;
    longDescription?: string;
    category?: string;
    tags?: string;
    imageUrl?: string;
    sortOrder?: string;
    _form?: string;
  };
};
