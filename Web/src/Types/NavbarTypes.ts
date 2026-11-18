export type NavTab = "home" | "discover" | "matches";

export interface NavItem {
  id: NavTab;
  label: string;
  to: string;
  end?: boolean;
  icon: (isActive: boolean) => React.ReactNode;
  badgeCount?: number;
}
