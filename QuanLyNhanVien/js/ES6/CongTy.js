class CongTy {
    constructor() {
        this.DanhSachNhanVien = [];
    }
    ThemNhanVien(nhanvien) {
        // this.DanhSachNhanVien.push(nhanvien) -> ES5
        this.DanhSachNhanVien = [...this.DanhSachNhanVien, nhanvien];
        //Dấu '...' là spread operator
    }

    // input: nhập vào mã nhân viên,  
    // ouput: vị trí nhân viên
    TimViTriNhanVienTheoMa(maNV) {
        // for(var i; i<this.DanhSachNhanVien.length;i++){
        //     if(this.DanhSachNhanVien[i].maNV === maNV){
        //         return i;
        //     }
        // }  ES5

        for (let vitri in this.DanhSachNhanVien) {
            if (this.DanhSachNhanVien[vitri].maNV === maNV) {
                return vitri;
            }
        }
    }
    // input: ma nhan vien
    // ouput: object nhan vien
    TimNhanVienTheoMa(maNV) {
        for (let nhanvien of this.DanhSachNhanVien) {
            if (nhanvien.maNV === maNV) {
                return nhanvien;
            }
        }
    }
    //------------- "for .. in" trả về vị trí, "for ... of" trả về phần tử
    //input: maNV
    //output: xoa nhan vien co maNV nhu input
    XoaNhanVien(maNV){
        let vitri = this.TimViTriNhanVienTheoMa(maNV);
        this.DanhSachNhanVien.splice(vitri,1); 
        //splice: trả về mảng khác (mảng sau khi cắt)
        //slice: 
    }
    // input: nhanvien
    // output: mangnhanvien da duoc chinh sua
    SuaNhanVien(nhanvien){
        let vitri = this.TimNhanVienTheoMa(nhanvien.maNV);
        this.DanhSachNhanVien[vitri] = nhanvien;
    }

    //Tim kiem
    //input: Nhap vao 1 chuoi
    //output: xuat ra mang co chua chuoi


    //Sap xep
    //
}