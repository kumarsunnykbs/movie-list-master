"use client";
import React from "react";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AppNavbar() {
    const pathName = usePathname()
    const route = useRouter()

    const handleLogout = () => {
        route.push("/sign-in");
        localStorage.removeItem("session");
    }

    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                {/* <MovieLogo /> */}
                <p className="font-bold text-inherit">MOVIE</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                <NavbarItem isActive={pathName.includes("/movie-list")}>
                    <Link color="foreground" href="/movie-list">
                        My Movies List
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathName.includes("/create-movie")}>
                    <Link color="foreground" href="/create-movie">
                        Create New Movie
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="team_settings">
                            <Link color="secondary" href="/movie-list">
                                My Movies List
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="analytics">
                            <Link href="/create-movie" aria-current="page" color="secondary">
                                Create New Movie
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" onClick={() => handleLogout()}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    )
}
