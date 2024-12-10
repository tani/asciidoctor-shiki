{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };
  outputs = inputs@{flake-parts, nixpkgs, ...}:
  flake-parts.lib.mkFlake { inherit inputs; } {
    systems = nixpkgs.lib.platforms.all;
    perSystem = { pkgs, ... }: {
      devShells.default = pkgs.mkShell {
        packages = with pkgs; [nodejs];
      };
    };
  };
}
