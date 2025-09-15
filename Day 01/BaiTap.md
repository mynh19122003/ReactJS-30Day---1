# Ngày 1: Bài tập

## Bài tập 1: Cài đặt môi trường

1.  Truy cập trang chủ [Node.js](https://nodejs.org/) và tải về phiên bản LTS (Long Term Support) mới nhất.
2.  Tiến hành cài đặt Node.js.
3.  Mở Terminal (hoặc Command Prompt/PowerShell) và kiểm tra xem Node.js và npm đã được cài đặt thành công chưa bằng các lệnh sau:
    ```bash
    node -v
    npm -v
    ```
4.  Nếu cả hai lệnh đều trả về số phiên bản, bạn đã cài đặt thành công.

## Bài tập 2: Tạo ứng dụng React đầu tiên

1.  Chọn một thư mục trên máy tính để chứa các dự án React của bạn.
2.  Mở Terminal tại thư mục đó.
3.  Sử dụng `create-react-app` để tạo một dự án mới có tên là `hello-react`:
    ```bash
    npx create-react-app hello-react
    ```
4.  Sau khi quá trình hoàn tất, di chuyển vào thư mục dự án:
    ```bash
    cd hello-react
    ```
5.  Khởi động ứng dụng:
    ```bash
    npm start
    ```
6.  Trình duyệt sẽ tự động mở và hiển thị trang chào mừng của React. Hãy chắc chắn rằng bạn thấy logo React đang quay.

## Bài tập 3: Chỉnh sửa nội dung đầu tiên

1.  Mở thư mục dự án `hello-react` bằng VS Code.
2.  Tìm và mở file `src/App.js`.
3.  Tìm đến đoạn văn bản `<p>Edit <code>src/App.js</code> and save to reload.</p>`.
4.  Thay đổi nó thành: `<p>Xin chào, đây là ứng dụng React đầu tiên của tôi!</p>`.
5.  Lưu file lại (Ctrl + S hoặc Cmd + S).
6.  Quay lại trình duyệt và xem sự thay đổi đã được tự động cập nhật chưa.

Chúc mừng! Bạn đã hoàn thành những bước đầu tiên trên hành trình chinh phục React.
