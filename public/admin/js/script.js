//Button STATUS
const buttonStatus = document.querySelectorAll("[button-status]") //thuộc tính tự định nghĩa phải đmở đóng ngoặc vuông

if(buttonStatus.length > 0) {

    let url = new URL(window.location.href); // lấy ra url, URL là hàm tự định nghĩa trong js

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if(status){
                // những cái sau dấu ? là phần search của url
                url.searchParams.set("status", status) // nó đã đổi xong url
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href; // chuyển hướng sang trang khác
        });
    });
}
//End ButtonStatus
//Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword){
            // những cái sau dấu ? là phần search của url
            url.searchParams.set("keyword", keyword) // nó đã đổi xong url
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
        
    });
}
//End Form Search
//Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]") // thuoc tinh tu dinh nghia phai them ngoac vuong
if(buttonsPagination){
    let url = new URL(window.location.href);
    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);

            window.location.href = url.href;
        });
    });
}
//End Pagination

//CheckBOx Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']"); // lấy ra ô có input checkall
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");   

    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked){
            inputsId.forEach(input => {
                input.checked = true;
            });
        } else{
            inputsId.forEach(input => {
                input.checked = false;
            });
        }
    });
    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

            if(countChecked == inputsId.length){
                inputCheckAll.checked = true;
            }
            else{
                inputCheckAll.checked = false;
            }
            
        });
    });
}
//End checkbox MUlti

//Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault(); // ngăn ngừa load lại trang

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

        const typeChange = e.target.elements.type.value;

        if(typeChange == "delete-all") {
            const isConfirm = confirm("Bạn muốn xóa không?");

            if(!isConfirm) {
                return;
            }
        }


        if(inputChecked.length > 0){
            let ids =[];

            const inputIds = formChangeMulti.querySelector("input[name='ids']"); 
            
            inputChecked.forEach(input => {
                const id = input.value; // dùng getAttribute cũng được



                if(typeChange == "change-position") {
                    const position  = input.closest("tr").querySelector("input[name='position]").value; // lấy ra 3 ô input
                    ids.push(`${id}-${position}`)
                } else {
                ids.push(id);
                }
            });
            // vì trong ô input chỉ lưu đc dạng text k lưu được dạng mảng nên cần dùng Join
            inputIds.value = ids.join(", ");

            formChangeMulti.submit();

        } else {
            alert("vui lòng chọn ít nhất 1 bản ghi")
        }
    });
}
//End form change multi

//Show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}
//End Show Alert

//Upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change", (e) => {
         const file = e.target.files[0];
         if(file) {
            uploadImagePreview.src = URL.createObjectURL(file);
         }
    });
}
//End Upload Image