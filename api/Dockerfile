FROM debian:bookworm

ENV DEBIAN_FRONTEND=noninteractive

# Install all system dependencies in one step
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    cmake \
    flex \
    bison \
    g++ \
    libmpfr-dev \
    wget \
    ca-certificates \
    libgl1 \
    libx11-6 \
    libxrender1 \
    libxcb1 \
    libxi6 \
    libegl1 \
    libfontconfig1 \
    libxext6 \
    libxfixes3 \
    && rm -rf /var/lib/apt/lists/*



# Install MiniZinc

WORKDIR /src/minizinc
ADD https://github.com/MiniZinc/MiniZincIDE/releases/download/2.9.7/MiniZincIDE-2.9.7-bundle-linux-x86_64.tgz MiniZincIDE-2.9.7-bundle-linux-x86_64.tar.gz
RUN tar -xf MiniZincIDE-2.9.7-bundle-linux-x86_64.tar.gz

WORKDIR /src
COPY . /src
RUN apt-get install -y \
    python3-pip \
    python3-dev


ENV PATH="/usr/bin:${PATH}"

RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt

ENV PATH="/src/minizinc/MiniZincIDE-2.9.7-bundle-linux-x86_64/bin:${PATH}"
ENV LD_LIBRARY_PATH="/src/minizinc/MiniZincIDE-2.9.7-bundle-linux-x86_64/lib:${LD_LIBRARY_PATH}"
ENV QT_PLUGIN_PATH="/src/minizinc/MiniZincIDE-2.9.7-bundle-linux-x86_64/plugins:${QT_PLUGIN_PATH}"

# Verify MiniZinc works
RUN which minizinc
RUN minizinc --version

EXPOSE 5000
CMD ["python3", "./src/app.py"]