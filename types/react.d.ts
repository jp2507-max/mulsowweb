import "react";

declare module "react" {
  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    /**
     * When true, the iframe will load without credentials, preventing Facebook from detecting logged-in state.
     * https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/credentialless
     */
  credentialless?: boolean | string;
  }
}
