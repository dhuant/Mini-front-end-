var mangThongBao = ["Vui lòng nhập mã nhân viên!",
                "Vui lòng nhận họ tên nhân viên!",
                "Vui lòng nhập Email!",
                "Vui lòng nhập mật khẩu!",
                "Vui lòng chọn chức vụ!",
                "Họ tên phải là ký tự!",
                "Mật khẩu phải có ít nhất 8 ký tự.",
                "Email chưa đúng định dạng.",
                "Ngày phải có định đạng dd/MM/yyyy"];

var danhSachNhanVien = new DanhSachNhanVien();
var trangHienTai = 1;

function getElement(e){
	return document.getElementById(e);
}


/*
	Hàm kiểm tra chuỗi kí tự theo định dạng
	Tham số truyền vào:
	  	- idField: id của input cần kiểm tra
	  	- idThongBao: id của span hiện thông báo
	  	- indexChuoiTB: vị trí chuỗi thông báo
	  	- typeKiemTra:
	    	+ 1: Kiểm tra dữ liệu bắt buộc
	    	+ 2: Kiểm tra dữ liệu định dạng
	   	 	+ 3: Kiểm tra độ dài chuỗi
	    	+ 4: Kiểm tra dữ liệu chọn
	  	- typeDinhDang: loại định dạng
		    + 1: định dạng ký tự
		    + 2: định dạng email
		    + 3: định dạng ngày
		- minLength: độ dài tối thiếu của chuỗi
	Kết quả trả về:
		- true: dữ liệu nhập đúng
		- false: dữ liệu nhập chưa đúng
 */

function KiemTraDuLieu(idField, idThongBao, indexChuoiTB, typeKiemTra, typeDinhDang, minLength){
	var kq = false;

	var idField = getElement(idField);
	var thongBao = getElement(idThongBao);

	switch (typeKiemTra) {
		case 1: //Kiểm tra dữ liệu bắt buộc
			kq = KiemTraNhap(idField);
		break;
		case 2: //Kiểm tra dữ liệu định dạng
			kq = KiemTraDinhDang(idField, typeDinhDang);
		break;
		case 3: //Kiểm tra độ dài chuỗi
			kq = KiemTraDoDaiChuoi(idField, minLength);
		break;
		case 4: //Kiểm tra dữ liệu chọn
			kq = KiemTraChon(idField);
		break;
	}

	if (kq){
		thongBao.style.display = "none";		
	} else {		
		thongBao.style.display = "block";
		thongBao.innerHTML = mangThongBao[indexChuoiTB];
	}

	return kq;
}

/*
  	Hàm kiểm tra dữ liệu bắt buộc dạng input
  	Truyền vào đối tượng cần kiểm tra (đã GetElementByID)
	Kết quả trả về:
		- true: dữ liệu nhập đúng
		- false: dữ liệu nhập chưa đúng  
*/
function KiemTraNhap(idField){
	if (idField.value === ""){
		return false;
	} else {
		return true;
	}
}

/*
  	Hàm kiểm tra dữ liệu bắt buộc dạng select
  	Truyền vào đối tượng cần kiểm tra (đã GetElementByID)
	Kết quả trả về:
		- true: dữ liệu nhập đúng
		- false: dữ liệu nhập chưa đúng  
*/
function KiemTraChon(idField){
	if (idField.selectedIndex === 0){
		return false;
	} else {
		return true;
	}
}

/*
  	Hàm kiểm tra định dạng dữ liệu nhập vào
  	Truyền vào đối tượng cần kiểm tra (đã GetElementByID)
	Kết quả trả về:
		- true: dữ liệu nhập đúng
		- false: dữ liệu nhập chưa đúng  
*/
function KiemTraDinhDang(idField, typeDinhDang){
	var mangKiTu;

	switch (typeDinhDang){
		case 1: // Định dạng ký tự
			mangKiTu = /^[A-Za-z]\/+$/;
		break;
		case 2: // Định dạng Email
			mangKiTu = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		break;
		case 3:
			mangKiTu = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
		break;
	}

	if (!idField.value.match(mangKiTu)){
		return false;
	} else {
		return true;
	}
}

/*
  	Hàm kiểm tra độ dài chuỗi
  	Truyền vào đối tượng cần kiểm tra (đã GetElementByID)
	Kết quả trả về:
		- true: dữ liệu nhập đúng
		- false: dữ liệu nhập chưa đúng  
*/

function KiemTraDoDaiChuoi(idField, minLength){
	if (idField.value.length < minLength){
		return false;
	} else {
		return true;
	}
}

// Hàm kiểm tra dữ liệu hợp lệ trước khi thêm, sửa
function KiemTraHopLe(){
	// Kiểm tra mã nhân viên
	var kq1 = KiemTraDuLieu("msnv", "tbMaNV", 0, 1, 0, 0, 0);

	// Kiểm tra họ tên
	var kq2 = KiemTraDuLieu("name", "tbTen", 1, 1, 0, 0, 0);
	if (kq2){ // Kiểm tra họ tên phải là ký tự
		// kq2 = KiemTraDuLieu("name", "tbTen", 5, 2, 1, 0, 0);	
	}

	// Kiểm tra Email
	var kq3 = KiemTraDuLieu("email", "tbEmail", 2, 1, 0, 0, 0);
	if (kq3){ // Kiểm tra định dạng Email
		kq3 = KiemTraDuLieu("email", "tbEmail", 7, 2, 2, 0, 0);
	}	

	// Kiểm tra mật khẩu
	var kq4 = KiemTraDuLieu("password", "tbMatKhau", 3, 1, 0, 0, 0);
	if (kq4){ // Mật khẩu ít nhất 8 ký tự
		kq4 = KiemTraDuLieu("password", "tbMatKhau", 6, 3, 0, 8);
	}	

	// Kiểm tra định dạng ngày
	var kq5 = KiemTraDuLieu("datepicker", "tbNgay", 8, 2, 3, 0, 0);

	// Kiểm tra chức vụ
	var kq6 = KiemTraDuLieu("chucvu", "tbChucVu", 4, 4, 0, 0, 0);	

	if (kq1 && kq2 && kq3 && kq4 && kq5 && kq6)
		return true;
	else
		return false;
}

/*
	Thiết lập lại các thong tin Modal
	Tham số truyền vào:
		- type = 1: gọi modal từ nút thêm
		- type = 2: gọi modal từ nút sửa
*/
function GoiModal(modal_title, readonly, type){
	getElement("header-title").innerHTML = modal_title;
	getElement("msnv").readOnly = readonly;

	switch (type){
		case 1:
			// Hiện nút thêm
			getElement("btnThemNV").style.display = "block";
			// Ẩn nút cập nhật
			getElement("btnCapNhatNV").style.display = "none";
		break;
		case 2:
			// Ẩn nút thêm
			getElement("btnThemNV").style.display = "none";
			// Hiện nút cập nhật
			getElement("btnCapNhatNV").style.display = "block";
		break;
	}
}

function XoaForm(){
	var element = document.getElementsByClassName("input-sm");
	for (var i = 0; i < element.length; i++){
		element[i].value = "";
	}
	getElement("chucvu").selectedIndex = 0;	
}

function LayDanhSachNhanVien(dsNV){
	var tbody = getElement('tableDanhSach');
	tbody.innerHTML = '';

	var soNV = dsNV.length;
	var nv, tr, td;

	var ulPhanTrang = getElement("ulPhanTrang");
	ulPhanTrang.innerHTML = '';

	var soDong = 2;
	var soTrang = Math.ceil(soNV/soDong);

	for (var i = 1; i <= soTrang; i++){
		var li = document.createElement('li');
		li.setAttribute("class", "page-item ");
		ulPhanTrang.appendChild(li);

		var a = document.createElement('a');
		a.setAttribute("class", "page-link");
		a.setAttribute("id", "trang_" + i);
		a.innerHTML = i;
		li.appendChild(a);

		ChuyenTrang('trang_' + i);
	}

	var batDau = (trangHienTai - 1) * soDong;
	var ketThuc = trangHienTai * soDong;

	if (soNV < ketThuc){
		ketThuc = soNV;
	}

	for (var i = batDau; i < ketThuc; i++){
		nv = dsNV[i];

		tr = document.createElement('tr');
		tbody.appendChild(tr);

		for (var j = 0; j < nv.mangHienThi.length; j++) {
			td = document.createElement('td');
			td.innerHTML = nv.mangHienThi[j];
			tr.appendChild(td);
		}	 			

		btnSua = "<a class='btn btn-primary text-white' data-toggle='modal' href='#myModal' id='sua_"+ nv.maNV + "'><em class='fa fa-pencil'></em></a>";
		btnXoa = "<a class='btn btn-danger text-white ml-2' id='xoa_"+ nv.maNV + "'><em class='fa fa-trash'></em></a>";

		td = document.createElement('td');
		td.innerHTML = btnSua + btnXoa;
		td.setAttribute("align", "center")
		tr.appendChild(td);

		XoaNhanVien('xoa_' + nv.maNV);
		SuaNhanVien('sua_' + nv.maNV);
	}
}

// Thêm nhân viên
getElement("btnThem").addEventListener("click", function(){
	XoaForm();
	GoiModal("Thêm người dùng", false, 1);
})

getElement("btnThemNV").addEventListener("click", function(){
	var kiemTraHopLe = KiemTraHopLe();

	if (kiemTraHopLe){
		var maNV = getElement("msnv").value;
		var hoTen = getElement("name").value;
		var email = getElement("email").value;
		var matKhau = getElement("password").value;
		var ngayLam = getElement("datepicker").value;
		var chucVu = getElement("chucvu").value;

		var nv = new NhanVien(maNV, hoTen, email, matKhau, ngayLam, chucVu);
		danhSachNhanVien.ThemNhanVien(nv);

		// Thêm xong đóng form
		getElement("btnThemNV").setAttribute("data-dismiss", "modal");
		// Hiện thông báo thành công
		swal("Thêm người dùng!", "Thành công!", "success");

		// Lấy danh sách nhân viên vào tables
		LayDanhSachNhanVien(danhSachNhanVien.dsNV);
	}
})

// Sửa thông tin nhân viên
function SuaNhanVien(idButton){
	getElement(idButton).addEventListener("click", function(){		
		var id = this.id;
		var mangTemp = id.split("_");
		var maNV = mangTemp[1];

		var nv = danhSachNhanVien.TimNhanVienTheoMa(maNV);

		getElement("msnv").value = maNV;
		getElement("name").value = nv.hoTen;
		getElement("email").value = nv.email;
		getElement("password").value = nv.password;
		getElement("datepicker").value = nv.ngayLam;
		getElement("chucvu").value = nv.chucVu;

		GoiModal("Cập nhật nhân viên", true, 2);
	});
}

// Cập nhật thông tin nhân viên
getElement("btnCapNhatNV").addEventListener("click", function(){
	var maNV = getElement("msnv").value;
	var hoTen = getElement("name").value;
	var email = getElement("email").value;
	var matKhau = getElement("password").value;
	var ngayLam = getElement("datepicker").value;
	var chucVu = getElement("chucvu").value;

	var nv = new NhanVien(maNV, hoTen, email, matKhau, ngayLam, chucVu);
	danhSachNhanVien.SuaNhanVien(nv);

	// Cập nhật xong đóng form
	getElement("btnCapNhatNV").setAttribute("data-dismiss", "modal");

	XoaForm();

	// Hiện thông báo thành công
	swal("Cập nhật nhân viên!", "Thành công!", "success");

	// Lấy danh sách nhân viên vào tables
	LayDanhSachNhanVien(danhSachNhanVien.dsNV);
})

// Xóa nhân viên
function XoaNhanVien(idButton){
	getElement(idButton).addEventListener("click", function(){

		swal({
		  title: "Bạn có chắc là muốn xóa nhân viên?",
		  text: "Khi đã xóa thì sẽ không thể khôi phục lại!",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true
		})
		.then((willDelete) => {
		  if (willDelete) {
			var id = this.id;
			var mangTemp = id.split("_");
			var maNV = mangTemp[1];

			 danhSachNhanVien.XoaNhanVien(maNV);		  	
		    swal("Xóa thành công!", {
		      icon: "success",
		    });

			// Lấy danh sách nhân viên vào tables
			LayDanhSachNhanVien(danhSachNhanVien.dsNV);			    
		  } 
		});		
	});
}

// Tìm nhân viên theo tên
getElement("searchName").addEventListener("keyup", function(){
	var tuKhoa = getElement("searchName").value;

	var dsKetQua = danhSachNhanVien.TimNhanVienTheoTen(tuKhoa);

	// Lấy danh sách nhân viên vào tables
	LayDanhSachNhanVien(dsKetQua.dsNV);		
})

// Sắp xếp mã nhân viên
getElement("SapXepTang").addEventListener("click", function(){
	getElement("SapXepTang").style.display = "none";
	getElement("SapXepGiam").style.display = "inline";

	danhSachNhanVien.SapXepNhanVien(1);
	LayDanhSachNhanVien(danhSachNhanVien.dsNV);	
})

getElement("SapXepGiam").addEventListener("click", function(){
	getElement("SapXepTang").style.display = "inline";
	getElement("SapXepGiam").style.display = "none";

	danhSachNhanVien.SapXepNhanVien(0);
	LayDanhSachNhanVien(danhSachNhanVien.dsNV);	
})

// Chuyển trang
function ChuyenTrang(idButton){
	getElement(idButton).addEventListener("click", function(){
		var id = this.id;
		var mangTemp = id.split("_");
		trangHienTai = mangTemp[1];	
		
		LayDanhSachNhanVien(danhSachNhanVien.dsNV);		
	})
}