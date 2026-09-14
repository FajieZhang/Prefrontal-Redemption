import os
import subprocess
import glob

# Find git executable
git_candidates = glob.glob(r'F:\Antigravity vault\*\.tools\git\cmd\git.exe')
if not git_candidates:
    # check default or path
    git_path = 'git'
else:
    git_path = git_candidates[0]

print("Using git at:", git_path)

cwd = r'f:\Antigravity vault\260914短视频戒断工具'

r1 = subprocess.run([git_path, 'add', '.'], cwd=cwd, capture_output=True, text=True)
print("git add:", r1.returncode, r1.stdout, r1.stderr)

r2 = subprocess.run([git_path, 'commit', '-m', 'feat: add Phase 0 mindful intro, custom 3-phase breathing, auto-reset on resume, and 1000-quote corpus'], cwd=cwd, capture_output=True, text=True)
print("git commit:", r2.returncode, r2.stdout, r2.stderr)

r3 = subprocess.run([git_path, 'push', 'origin', 'main'], cwd=cwd, capture_output=True, text=True)
print("git push:", r3.returncode, r3.stdout, r3.stderr)
