class NhanVien {
    constructor(maNV, hoTen, email, matKhau, ngayLamViec, chucVu) {
        this.maNV = maNV;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLamViec = ngayLamViec;
        this.chucVu = chucVu;

        this.mangDoiChieu = [this.maNV, this.hoTen, this.email, this.ngayLamViec, this.chucVu];
    }
} //Tao lop doi tuong voi class

// export default NhanVien;
//export co hai dang, co tu khoa "default" va k co "default"