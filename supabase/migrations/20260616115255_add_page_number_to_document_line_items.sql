ALTER TABLE public.document_line_items
  ADD COLUMN page_number INTEGER DEFAULT 1 NOT NULL,
  ADD COLUMN bounding_box FLOAT8[4] DEFAULT ARRAY[0,0,0,0] NOT NULL;
