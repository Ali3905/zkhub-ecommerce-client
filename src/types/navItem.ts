import { LucideIcon } from 'lucide-react';
import { ComponentType } from 'react';

export type IDType = "dashboard" | "products" | "orders" | "settings";

export interface NavItem {
    id: IDType;
    label: string;
    icon: LucideIcon;
    component: ComponentType;
}

export type NavItems = NavItem[];