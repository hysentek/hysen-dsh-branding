# Prompt cài đặt Hysentek branding trên máy khác

Dán nguyên khối dưới đây vào một phiên DSH trên máy đích.

---

Bạn đang chạy DSH trên một máy mới. Hãy cài plugin nhận diện thương hiệu **Hysentek** cho DSH Web trên máy này.

**Nguồn công khai:** https://github.com/hysentek/hysen-dsh-branding — phiên bản ổn định `v1.1.1`, bundle `@local/hysentek-branding`.

**Điều kiện:** DSH đang chạy với Web profile; `pnpm` có trên `PATH` của Host. Repo public nên không cần token GitHub.

**Các bước**

1. Kiểm tra nhanh `pnpm --version` và xác nhận DSH đang chạy ở Web profile.
2. Cài bundle bằng tool `plugin_manager`:
   - `action: install_bundle`
   - `target: github:hysentek/hysen-dsh-branding#v1.1.1`
   - Phương án dự phòng không cần git (asset của release):
     `https://github.com/hysentek/hysen-dsh-branding/releases/download/v1.1.1/local-hysentek-branding-1.1.1.tgz`
3. Đọc kết quả: `application` phải là `applied` và bundle phải `enabled: true`. Nếu gặp lỗi `HMR transactions cannot be nested`:
   - thêm `"@local/hysentek-branding"` vào `dsh.profile.bundles` trong `package.json` của profile (sau `@deepseek-ai/dsh-web-app`), lưu file — HMR watcher sẽ áp dụng;
   - nếu vẫn không lên, khởi động lại `dsh web`.
4. Xác minh đăng ký client bằng `cordis_inspect_query` (platform `client`, provider `Slots`, method `listSubTree`) cho từng root:
   - `sidebar.brand.mark`
   - `sidebar.brand.name`
   - `conversation.hero.brand.mark`
   - `conversation.hero.frame`

   Mỗi root phải có occupant `registrant: "@local/hysentek-branding"`, `priority: -1`, `active: true`; entry gốc `WC` (nếu có) phải thành `active: false`.
5. Xác minh giao diện nếu nhìn được: sidebar có monogram H và chữ `Hysentek AI`; trang phiên mới có logo và tiêu đề `Bố làm tất`; nút Send màu indigo; tab trình duyệt `… — Hysentek AI` với favicon mới.
6. Nếu client chưa cập nhật, reload trang một lần.

**Không** tự sửa source hay đổi thương hiệu trừ khi được yêu cầu. Muốn đổi tên/màu: clone repo, sửa `BRAND`/`TOKENS` trong `client.js`, bump `version`, rồi cài lại từ thư mục clone.

**Báo cáo lại:** phiên bản đã cài, bundle có enabled không, các slot đã active, và phần nào chưa xác minh trực quan (không có screenshot).
