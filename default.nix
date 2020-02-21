# This pins the packages to certain versions
with import (builtins.fetchTarball {
  # Descriptive name to make the store path easier to identify
  name = "nixos-19.09";
  # Commit hash for nixos as of 19.09
  url = https://github.com/NixOS/nixpkgs/archive/19.09.tar.gz;
  # Hash obtained using `nix-prefetch-url --unpack <url>`
  sha256 = "0mhqhq21y5vrr1f30qd2bvydv4bbbslvyzclhw0kdxmkgg3z4c92";
}) {};

stdenv.mkDerivation rec {
  name = "env";
  env = buildEnv { name = name; paths = buildInputs; };
  buildInputs = [
    nodejs-12_x
  ];
}