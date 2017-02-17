{ pkgs ? import <nixpkgs> {} }:

let
  jdk = pkgs.jdk8;
  fhs = pkgs.buildFHSUserEnv {
    name = "android-env";
    targetPkgs = pkgs: with pkgs; [
      bash
      ncurses
      nodejs
      git
      which
      jdk
      watchman
    ];
    multiPkgs = pkgs: with pkgs; [
      gst_all_1.gst-plugins-ugly
      gst_all_1.gstreamer
      xlibs.libX11
      xlibs.libXcomposite
      xlibs.libXext
      xlibs.libXfixes
      xlibs.libXrandr
      xlibs.libXtst
      zlib
    ];
    runScript = "bash";
    profile = ''
      export ANDROID_EMULATOR_FORCE_32BIT=true
      export ANDROID_HOME="${builtins.getEnv "ANDROID_HOME"}"
      export PATH="$PATH:$ANDROID_HOME/tools"
      export PATH="$PATH:$ANDROID_HOME/platform-tools"
      export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$ANDROID_HOME/tools/lib64
    '';
  };
in
pkgs.stdenv.mkDerivation {
  name = "android-sdk-fhs-shell";
  nativeBuildInputs = [ fhs ];
  shellHook = "exec android-env";
}
