import os
import zipfile
import time

root = r"C:\Users\User\Documents\GitHub\Mindframe-Builder"
dest_dir = os.path.join(root, "attached_assets")
os.makedirs(dest_dir, exist_ok=True)
_ts = time.strftime("%Y%m%d_%H%M%S")
zip_path = os.path.join(dest_dir, f"mindframe-builder-{_ts}.zip")

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for foldername, subfolders, filenames in os.walk(root):
        rel = os.path.relpath(foldername, root)
        if rel == 'attached_assets' or rel.startswith('attached_assets'):
            continue
        if rel == 'node_modules' or rel.startswith('node_modules'):
            continue
        if rel == '.git' or rel.startswith('.git'):
            continue
        for filename in filenames:
            file_path = os.path.join(foldername, filename)
            arcname = os.path.relpath(file_path, root)
            zipf.write(file_path, arcname)

print(zip_path)
