// import NhanVien from './NhanVien'

let congTy = new CongTy();
let trangHienTai = 1;
//Them nhan vien vao mang DanhSachNhanVien
for (let nhanvien of data) {
    let maNV = nhanvien.maNV;
    let hoTen = nhanvien.hoTen;
    let email = nhanvien.email;
    let matKhau = nhanvien.matKhau;
    let ngayLamViec = nhanvien.ngayLamViec;
    let chucVu = nhanvien.chucVu;

    let nhanvienmoi = new NhanVien(maNV, hoTen, email, matKhau, ngayLamViec, chucVu);
    congTy.ThemNhanVien(nhanvienmoi);
}

for (let nhanvien in data) {
    console.log(nhanvien);
}

//Gọi modal
//input: modal_title; readonly; type: 1- them nguoi dung, 2: sua nguoi dung
//output:
const GoiModal = (modal_title, readOnly = false, type = 1) => {
    document.getElementById('header-title').innerHTML = modal_title;
    document.getElementById('msnv').readOnly = readOnly;
    switch (type) {
        case 2:
            document.getElementById('btnCapNhatNV').style.display = "block";
            document.getElementById('btnThemNV').style.display = "none"
            break;

        default:
            document.getElementById('btnCapNhatNV').style.display = "none";
            document.getElementById('btnThemNV').style.display = "block"
            break;
    }
}
const XoaForm = () => {
    let inputArr = document.getElementsByClassName('input-sm');
    for (let input of inputArr) {
        input.value = "";
    }
    document.getElementById("chucvu").selectedIndex = 0;

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    // template string
    document.getElementById("datepicker").value = `${mm}/${dd}/${yyyy}`;
}

// Hien thi danh sach nhan vien
const HienThiDanhSach = (dsnv) => {
    let tbody = document.getElementById('tableDanhSach');
    tbody.innerHTML = "";

    let soNV = dsnv.length;
    let nv, tr, td;

    //pagination
    let ulPhanTrang = document.getElementById('ulPhanTrang');
    ulPhanTrang.innerHTML = "";

    let soDong = 4;
    let soTrang = Math.ceil(soNV / soDong);

    for (let i = 1; i <= soTrang; i++) {
        let li = document.createElement('li');
        li.setAttribute('class', 'page-item');
        ulPhanTrang.appendChild(li)

        let a = document.createElement('a');
        a.setAttribute('class', 'page-link');
        a.setAttribute("id", `pagi_${i}`);
        li.appendChild(a);
        a.innerHTML = i;

        ChuyenTrang(`pagi_${i}`)
    }
    // Hien thi danh sach nhan vien
    let batDau = (trangHienTai - 1) * soDong;
    let ketThuc = trangHienTai * soDong;

    if (ketThuc > soNV) {
        ketThuc = soNV;
    }

    for (let i = batDau; i < ketThuc; i++) {
        nv = dsnv[i];
        tr = document.createElement('tr');
        tbody.appendChild(tr);
        let tdMaNV = document.createElement('td');
        tr.appendChild(tdMaNV);
        tdMaNV.innerHTML = nv.maNV;

        let tdHoTen = document.createElement('td');
        tr.appendChild(tdHoTen);
        tdHoTen.innerHTML = nv.hoTen;

        let tdEmail = document.createElement('td');
        tr.appendChild(tdEmail);
        tdEmail.innerHTML = nv.email;

        let tdNgayVaoLam = document.createElement('td');
        tr.appendChild(tdNgayVaoLam);
        tdNgayVaoLam.innerHTML = nv.ngayLamViec;

        let tdChucVu = document.createElement('td');
        tr.appendChild(tdChucVu);
        tdChucVu.innerHTML = nv.chucVu;

        let buttonXoa = document.createElement('a');
        buttonXoa.innerHTML = "Xóa";
        buttonXoa.setAttribute('id', `btnXoa_${nv.maNV}`);
        buttonXoa.setAttribute('class', 'btn btn-danger');
        tr.appendChild(buttonXoa);

        let buttonSua = document.createElement('a');
        buttonSua.innerHTML = "Sửa";
        buttonSua.setAttribute('id', `btnSua_${nv.maNV}`);
        buttonSua.setAttribute('class', 'btn btn-warning');
        buttonSua.setAttribute('data-toggle','modal');
        buttonSua.setAttribute('data-target','#myModal')

        tr.appendChild(buttonXoa);
        tr.appendChild(buttonSua);
        
        XoaNhanVien(`btnXoa_${nv.maNV}`);
        SuaNhanVien(`btnSua_${nv.maNV}`);
    }
}

//Chuyen trang
const ChuyenTrang = (idButton) => {
    document.getElementById(idButton).addEventListener('click', () => {
        trangHienTai = idButton.split("_")[1];
        HienThiDanhSach(congTy.DanhSachNhanVien);
    })
}

document.getElementById('btnThem').addEventListener('click', () => {
    GoiModal('THEM NHAN VIEN');
})

document.getElementById('btnThemNV').addEventListener('click', () => {
    let maNV = document.getElementById("msnv").value;
    let hoTen = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let matKhau = document.getElementById("password").value;
    let ngayLamViec = document.getElementById("datepicker").value;
    let chucVu = document.getElementById("chucvu").value;

    let nhanvienmoi = new NhanVien(maNV, hoTen, email, matKhau, ngayLamViec, chucVu);
    congTy.ThemNhanVien(nhanvienmoi);
    // Thêm xong đóng form
    getElement("btnThemNV").setAttribute("data-dismiss", "modal");
    HienThiDanhSach(congTy.DanhSachNhanVien);

})

const XoaNhanVien = (idButton) => {
    document.getElementById(idButton).addEventListener('click', () => {
        let id = idButton.split("_")[1];
        congTy.XoaNhanVien(id);
        HienThiDanhSach(congTy.DanhSachNhanVien);
    })
}

const SuaNhanVien = (idButton) => {
    document.getElementById(idButton).addEventListener('click', () => {
        let id  = idButton.split("_")[1];
        GoiModal("SUA NHAN VIEN",true,2);
        let nv = congTy.TimNhanVienTheoMa(id);

        document.getElementById("msnv").value = nv.maNV;
		document.getElementById("name").value = nv.hoTen;
		document.getElementById("email").value = nv.email;
		document.getElementById("password").value = nv.matKhau;
		document.getElementById("datepicker").value = nv.ngayLamViec;
        document.getElementById("chucvu").selectedIndex = nv.chucVu;
    })
}
document.getElementById("btnCapNhatNV").addEventListener('click',() => {
    let maNV = document.getElementById("msnv").value;
    let index = congTy.TimViTriNhanVienTheoMa(maNV);

    let hoTen = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let matKhau = document.getElementById("password").value;
    let ngayLamViec = document.getElementById("datepicker").value;
    let chucVu = document.getElementById("chucvu").value;

    let nhanviensua = new NhanVien(maNV, hoTen, email, matKhau, ngayLamViec, chucVu);
    congTy.DanhSachNhanVien[index] = nhanviensua;

    HienThiDanhSach(congTy.DanhSachNhanVien);
})
HienThiDanhSach(congTy.DanhSachNhanVien);
