---
title: 'Biometric Radar Signal Processing System (Python)'
excerpt: 'Real-time radar signal processing pipeline for biometric and motion analysis using Infineon BGT60UTR11AIP.'
coverImage: 'biometric-radar/radar_processing_pipeline'
date: '2025-10-01T05:35:07.322Z'
live: ''
author:
  name: J.A. Covert
  picture: assets/james_profile_pic.png
ogImage:
  url: 'biometric-radar/radar_processing_pipeline'
images: []
repo: https://github.com/XcovertX/biometric-radar
---

## Biometric Radar Signal Processing System

### Project Overview
This project implements a Python-based radar signal processing system leveraging the **Infineon BGT60UTR11AIP mmWave sensor** for real-time biometric and motion analysis.  
The system forms the foundation for non-contact physiological sensing—tracking metrics such as **heart rate variability (HRV)** and **respiratory patterns** using subtle radar phase and amplitude variations.

It includes a modular Python architecture for acquisition, filtering, FFT-based analysis, visualization, and future integration with embedded wellness systems like the **Ammortal Chamber**.

### Core Method
In plain terms: the radar sends out electromagnetic waves and measures their reflections off the human body. Small changes in phase and frequency in the reflected signal correspond to chest or body motion from breathing or heartbeat.  
By continuously sampling and processing this data stream, the software can extract biometric patterns and visualize them in real time.

### Features
- **Real-Time Frame Capture:** Connects to and streams raw data from Infineon’s Radar SDK.  
- **Signal Processing Pipeline:** Implements filtering, FFT transforms, and motion energy detection.  
- **Biometric Extraction:** Early exploration of deriving HRV and respiration waveforms from micro-motion.  
- **Dynamic Plotting:** Matplotlib-based real-time visualization of range, velocity, and amplitude.  
- **Extensible Architecture:** Logical file structure supports modular upgrades for feature extraction, ML models, or C-UAS signal analysis.

### Setup and Development
The system is designed to be portable and reproducible:
- Python virtual environment for dependency isolation.
- Modular structure (`acquisition/`, `processing/`, `plotting/`, `reporting/`).
- Debug and visualization modes for signal analysis.
- CLI support for configurable parameters (`--window`, `--report`, `--plot`, `--debug`).

### Example Usage
```bash
python main.py --window 3 --report 1 --plot --debug