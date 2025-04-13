declare module "lucide-react-native" {
  import { ComponentType } from "react";
  import { SvgProps } from "react-native-svg";
  interface LucideIconProps extends SvgProps {
    size?: number;
  }
  const Search: ComponentType<LucideIconProps>;
  const Bell: ComponentType<LucideIconProps>;
  const ShoppingBag: ComponentType<LucideIconProps>;
  const Menu: ComponentType<LucideIconProps>;
  const X: ComponentType<LucideIconProps>;
  const Minus: ComponentType<LucideIconProps>;
  const Plus: ComponentType<LucideIconProps>;
  const Trash2: ComponentType<LucideIconProps>;
  export { Search, Bell, ShoppingBag, Menu, X, Minus, Plus, Trash2 };
}

declare module "react-native-safe-area-context" {
  import { ReactNode } from "react";
  import { ViewProps } from "react-native";

  export function SafeAreaProvider(props: { children: ReactNode }): JSX.Element;
  export function SafeAreaView(
    props: ViewProps & { children?: ReactNode; edges?: string[] }
  ): JSX.Element;
  export function useSafeAreaInsets(): {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}
