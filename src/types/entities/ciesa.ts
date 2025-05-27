export type TCiesa = {
    id: string;
    car: string;
    seri: number;
    brutto: number;
    netto: number;
    gudang: string;
    nitku: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    deleted_at: string | null;
    vehicle_id: string;
    kode_dok_in_out: string;
    kode_dokumen: string;
    kode_respon: string | null;
    no_dok_in_out: string;
    tanggal_dok_in_out: string; // ISO date string or YYYY-MM-DD
    no_daftar: string;
    tanggal_daftar: string; // ISO date string or YYYY-MM-DD
    kode_kantor: string;
    kode_kantor_pengawas: string;
    kode_kantor_bongkar: string | null;
    kode_kantor_muat: string;
    id_perusahaan: string;
    nama_perusahaan: string;
    alamat_perusahaan: string;
    id_ppjk: string | null;
    nama_ppjk: string | null;
    alamat_ppjk: string | null;
    no_polisi: string;
    status_jalur: string;
    jumlah_container: number;
    jumlah_kemasan: number;
    fl_segel: string | null;
};
