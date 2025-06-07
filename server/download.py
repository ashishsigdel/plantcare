from huggingface_hub import hf_hub_download
import os

MODEL_PATH = "model/best.pt"

if not os.path.exists(MODEL_PATH):
    print("Downloading YOLOv8 model from Hugging Face...")
    os.makedirs("model", exist_ok=True)
    hf_hub_download(repo_id="ashishsigdel/plant_care", filename="plantcare_model.pt", local_dir="model")