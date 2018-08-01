function DanhSachNhanVien(){
	this.dsNV = [];

	// Thêm nhân viên
	this.ThemNhanVien = function(nv){
		this.dsNV.push(nv);
	}

	// Tìm vị trí nhân viên theo mã nhân viên, trả về vị trí nhân viên
	this.TimViTriTheoMa = function(maNV){
		for (var i = 0; i <= this.dsNV.length; i++){
			var nv = this.dsNV[i];
			if (nv.maNV === maNV){
				return i;
			}
		}
	}

	// Tìm nhân viên theo mã nhân viên, trả về nhân viên
	this.TimNhanVienTheoMa = function(maNV){
		for (var i = 0; i <= this.dsNV.length; i++){
			var nv = this.dsNV[i];
			if (nv.maNV === maNV){
				return nv;
			}
		}
	}	

	// Tìm nhân viên theo tên, trả về danh sách nhân viên
	this.TimNhanVienTheoTen = function (hoTenTim){
		var dsKetQua = new DanhSachNhanVien();
		hoTenTim = hoTenTim.trim().toUpperCase();

		for (var i = 0; i < this.dsNV.length; i++) {
			var nv = this.dsNV[i];
			var hoTen = nv.hoTen.trim().toUpperCase();

			if (hoTen.search(hoTenTim) !== -1){
				dsKetQua.dsNV.push(nv);
			}
		}

		return dsKetQua;
	}

	// Xóa nhân viên theo mã nhân viên
	this.XoaNhanVien = function(maNV){
		var viTri = this.TimViTriTheoMa(maNV);
		this.dsNV.splice(viTri, 1);
	}

	// Sửa nhân viên, tham số truyền vào là nhân viên cần sửa
	this.SuaNhanVien = function(nv){
		var viTri = this.TimViTriTheoMa(nv.maNV);

		this.dsNV[viTri] = nv;
	}

	/**
		Sắp xếp nhân viên theo mã nhân viên, trả về danh sách nhân viên đã sắp
		Tham số truyền vào tang
		 - tang = 1: sắp xếp theo chiều tăng
		 - tang = 0: sắp xếp theo chiều giảm
	*/
	this.SapXepNhanVien = function(tang){
		if (tang === 1){ // Sắp xếp tăng dần
			this.dsNV.sort(function(a,b){
				var x = a.maNV.toLowerCase();
				var y = b.maNV.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;				
			});
		}
		else { // Sắp xếp giảm dần
			this.dsNV.sort(function(a,b){
				var x = a.maNV.toLowerCase();
				var y = b.maNV.toLowerCase();
				if (x < y) {return 1;}
				if (x > y) {return -1;}
				return 0;				
			});
		}
	}
}