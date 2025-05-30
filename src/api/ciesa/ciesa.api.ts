import axios from "@/src/libs/axios";
import { TListCiesaResponse } from "./ciesa.response";
import { CIESA_DOCS_URL } from "./ciesa.constant";
import { TTListCiesaFilterParams } from "./ciesa.request";

export const listDocumentCiesa = async (params?: TTListCiesaFilterParams) => {
  try {
    const response = await axios.get<TListCiesaResponse>(CIESA_DOCS_URL, {
      params,
    });
    // console.log("Params NITKU", params);
    // console.log("CIESA API Response:", response.request);

    return response.data;

    // Mock response based on TListCiesaResponse
    // Remove/comment this block in production
    // return {
    //   data: {
    //     items: [
    //       {
    //         id: "1",
    //         car: "CAR12345",
    //         seri: 1,
    //         brutto: 1000,
    //         netto: 950,
    //         gudang: "Gudang A",
    //         nitku: "NITKU001",
    //         created_at: new Date().toISOString(),
    //         updated_at: new Date().toISOString(),
    //         deleted_at: null,
    //         vehicle_id: "VEH123",
    //         kode_dok_in_out: "IN",
    //         kode_dokumen: "DOC001",
    //         kode_respon: null,
    //         no_dok_in_out: "NDI001",
    //         tanggal_dok_in_out: new Date().toISOString().slice(0, 10),
    //         no_daftar: "ND123",
    //         tanggal_daftar: new Date().toISOString().slice(0, 10),
    //         kode_kantor: "KTR01",
    //         kode_kantor_pengawas: "KTRP01",
    //         kode_kantor_bongkar: null,
    //         kode_kantor_muat: "KTRM01",
    //         id_perusahaan: "PRSH001",
    //         nama_perusahaan: "PT Contoh Satu",
    //         alamat_perusahaan: "Jl. Contoh No.1",
    //         id_ppjk: null,
    //         nama_ppjk: null,
    //         alamat_ppjk: null,
    //         no_polisi: "B1234XYZ",
    //         status_jalur: "HIJAU",
    //         jumlah_container: 2,
    //         jumlah_kemasan: 10,
    //         fl_segel: null,
    //       },
    //       {
    //         id: "2",
    //         car: "CAR67890",
    //         seri: 2,
    //         brutto: 2000,
    //         netto: 1900,
    //         gudang: "Gudang B",
    //         nitku: "NITKU002",
    //         created_at: new Date().toISOString(),
    //         updated_at: new Date().toISOString(),
    //         deleted_at: null,
    //         vehicle_id: "VEH456",
    //         kode_dok_in_out: "OUT",
    //         kode_dokumen: "DOC002",
    //         kode_respon: "RESP001",
    //         no_dok_in_out: "NDI002",
    //         tanggal_dok_in_out: new Date().toISOString().slice(0, 10),
    //         no_daftar: "ND456",
    //         tanggal_daftar: new Date().toISOString().slice(0, 10),
    //         kode_kantor: "KTR02",
    //         kode_kantor_pengawas: "KTRP02",
    //         kode_kantor_bongkar: "KTRB01",
    //         kode_kantor_muat: "KTRM02",
    //         id_perusahaan: "PRSH002",
    //         nama_perusahaan: "PT Contoh Dua",
    //         alamat_perusahaan: "Jl. Contoh No.2",
    //         id_ppjk: "PPJK001",
    //         nama_ppjk: "PPJK Satu",
    //         alamat_ppjk: "Jl. PPJK No.1",
    //         no_polisi: "B5678ABC",
    //         status_jalur: "MERAH",
    //         jumlah_container: 1,
    //         jumlah_kemasan: 5,
    //         fl_segel: "SEGEL001",
    //       },
    //     ],
    //     meta: {
    //       page: 1,
    //       per_page: 10,
    //       total: 2,
    //       total_page: 1,
    //     },
    //   },
    //   message: "Mocked response for testing",
    //   status_code: 200,
    //   version: "1.0.0",
    // } as TListCiesaResponse;

    
  } catch (err) {
    throw new Error("Network error occurred");
  }
};
