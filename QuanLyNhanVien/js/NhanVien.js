function NhanVien(maNV, hoTen, email, matKhau, ngayLam, chucVu){
	this.maNV = maNV;
	this.hoTen = hoTen;
	this.email = email;
	this.matKhau = matKhau;
	this.ngayLam = ngayLam;
	this.chucVu = chucVu;

	this.mangThuocTinh = [this.maNV, this.hoTen, this.email, 
	                      this.matKhau, this.ngayLam, this.chucVu];

	this.mangHienThi = [this.maNV, this.hoTen, this.email, 
	                    this.ngayLam, this.chucVu];	                      

	this.SoThuocTinh = function(){
		return this.mangThuocTinh.length;
	}
}