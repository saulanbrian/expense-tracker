ALTER TABLE public.documents
ADD COLUMN usd_rate_as_of_billing_date NUMERIC(18, 6),
ADD COLUMN usd_conversion_total NUMERIC(12, 2);
