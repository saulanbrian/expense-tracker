import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase({ auth: ["publishable", "secret"] }, async (req, ctx) => {
    try {
      const { document_storage_path } = await req.json();
      const { supabaseAdmin } = ctx;

      if (!document_storage_path) {
        return Response.json(
          { error: "No document_storage_path provided" },
          { status: 400 },
        );
      }

      // 1. Download the file from storage (
      const { data: fileBlob, error: downloadError } =
        await supabaseAdmin.storage
          .from("documents")
          .download(document_storage_path);

      if (downloadError) {
        return Response.json(
          { error: `Storage download failed: ${downloadError.message}` },
          { status: 400 },
        );
      }

      // 2. Convert the Web Blob into an ArrayBuffer, then into a Uint8Array
      const arrayBuffer = await fileBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // 3. Chunk the binary processing so large PDFs/images don't blow up the call stack
      let binaryString = "";
      const chunkSize = 8192;
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        binaryString += String.fromCharCode.apply(
          null,
          uint8Array.subarray(i, i + chunkSize),
        );
      }

      // 4. Safely convert the binary string to a clean text-based Base64 string
      const base64String = btoa(binaryString);

      return Response.json({
        base64String,
      });
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  }),
};
