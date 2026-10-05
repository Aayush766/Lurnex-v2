"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  CircleUserRound,
  LogOut,
} from "lucide-react";

import { navItems } from "@/lib/constants";
import { courseMenu } from "@/lib/course-menu";
import { courseContentHref } from "@/lib/course-content-links";
import { Button } from "@/components/ui/Button";
import { LanguageSelector } from "@/components/ui/LanguageSelector";

require("./Header.css");

const cmsHref = (courseSlug: string, label: string) =>
  courseContentHref(courseSlug, label);

export function Header() {
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState(courseMenu[0]);
  const [signedIn, setSignedIn] = useState(false);
  const [learner, setLearner] = useState<{ name?: string; avatarUrl?: string } | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const syncAuth = () => {
      setSignedIn(Boolean(localStorage.getItem("lumex_token")));
      try { setLearner(JSON.parse(localStorage.getItem("lumex_user") || "null")); } catch { setLearner(null); }
    };
    syncAuth();
    window.addEventListener("lumex-auth-changed", syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("lumex-auth-changed", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("lumex_token");
    localStorage.removeItem("lumex_user");
    setSignedIn(false);
    setAccountOpen(false);
    window.dispatchEvent(new Event("lumex-auth-changed"));
    window.location.assign("/");
  };

  const closeMenus = () => {
    setOpen(false);
    setCoursesOpen(false);
  };

  return (
    <header className="site-header">

      {/* =====================================================
          MAIN HEADER
      ====================================================== */}

      <div className="header-container">

        {/* =================================================
            LOGO
        ================================================== */}

        <Link
          href="/"
          aria-label="Lurnex home"
          className="header-logo-link"
          onClick={closeMenus}
        >
          <span className="header-logo-glow" />

          <img
            src="/logo.png"
            alt="Lurnex"
            className="header-logo"
          />
        </Link>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <nav
          className="desktop-navigation"
          aria-label="Primary navigation"
        >
          {navItems.map((item) =>
            item.label === "Courses" ? (
              <div
                key={item.href}
                className={`courses-menu ${
                  coursesOpen ? "courses-menu-open" : ""
                }`}
                onMouseEnter={() => setCoursesOpen(true)}
                onMouseLeave={() => setCoursesOpen(false)}
              >

                {/* Courses trigger */}

                <button
                  className="desktop-nav-link courses-menu-trigger"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={coursesOpen}
                  onClick={() =>
                    setCoursesOpen((value) => !value)
                  }
                  onFocus={() => setCoursesOpen(true)}
                >
                  <span>Courses</span>

                  <ChevronDown
                    size={14}
                    strokeWidth={2.4}
                    className="courses-chevron"
                    aria-hidden="true"
                  />
                </button>


                {/* =================================================
                    COURSES MEGA MENU
                ================================================== */}

                {coursesOpen && (
                  <div className="courses-mega-menu">

                    {/* =============================================
                        LEFT COURSE LIST
                    ============================================== */}

                    <div className="courses-menu-list">

                      <div className="courses-menu-label">
                        <Sparkles
                          size={12}
                          strokeWidth={2}
                        />

                        <span>
                          Explore Programs
                        </span>
                      </div>


                      {courseMenu.map((course) => (
                        <Link
                          key={course.slug}
                          href={course.href}
                          className={`courses-menu-item ${
                            activeCourse.slug === course.slug
                              ? "active"
                              : ""
                          }`}
                          onMouseEnter={() =>
                            setActiveCourse(course)
                          }
                          onFocus={() =>
                            setActiveCourse(course)
                          }
                          onClick={() =>
                            setCoursesOpen(false)
                          }
                        >

                          <span className="courses-menu-item-content">

                            <strong>
                              {course.title}
                            </strong>

                            <small>
                              {course.description}
                            </small>

                          </span>


                          <span className="course-arrow">
                            <ChevronRight
                              size={15}
                              strokeWidth={2.2}
                            />
                          </span>

                        </Link>
                      ))}

                    </div>


                    {/* =============================================
                        RIGHT COURSE DETAILS
                    ============================================== */}

                    <div className="courses-menu-details">

                      <div className="courses-menu-heading">

                        <div className="courses-menu-heading-content">

                          <span className="courses-eyebrow">
                            PROGRAM
                          </span>

                          <h2>
                            {activeCourse.title}
                          </h2>

                          <p>
                            {activeCourse.description}
                          </p>

                        </div>


                        <div className="courses-menu-heading-links">

                          <Link
                            href="/courses"
                            onClick={() =>
                              setCoursesOpen(false)
                            }
                          >
                            All courses

                            <ChevronRight
                              size={14}
                            />
                          </Link>


                          <Link
                            href={activeCourse.href}
                            onClick={() =>
                              setCoursesOpen(false)
                            }
                          >
                            Overview

                            <ChevronRight
                              size={14}
                            />
                          </Link>

                        </div>

                      </div>


                      {/* Course categories */}

                      <div className="courses-menu-categories">

                        {activeCourse.categories.map(
                          (category) => (
                            <section
                              key={category.title}
                              className="course-category"
                            >

                              <h3>
                                {category.title}
                              </h3>


                              <div className="course-category-links">

                                {category.links.map(
                                  (link) => (
                                    <Link
                                      key={link.label}
                                      href={cmsHref(
                                        activeCourse.slug,
                                        link.label
                                      )}
                                      onClick={() =>
                                        setCoursesOpen(false)
                                      }
                                    >

                                      <span>
                                        {link.label}
                                      </span>

                                      <ChevronRight
                                        size={12}
                                      />

                                    </Link>
                                  )
                                )}

                              </div>

                            </section>
                          )
                        )}

                      </div>

                    </div>

                  </div>
                )}

              </div>
            ) : (

              <Link
                key={item.href}
                href={item.href}
                className="desktop-nav-link"
                onClick={() =>
                  setCoursesOpen(false)
                }
              >
                {item.label}
              </Link>

            )
          )}
        </nav>


        {/* =================================================
            DESKTOP ACTIONS
        ================================================== */}

        <div className="header-actions">

          {/* Language */}

          <div className="header-language-wrapper">
            <LanguageSelector />
          </div>


          {signedIn ? <div className="relative">
            <button type="button" aria-label="Account menu" aria-expanded={accountOpen} onClick={() => setAccountOpen((v) => !v)} className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-[#0B2A55] text-sm font-bold text-white">{learner?.avatarUrl ? <img src={learner.avatarUrl} alt="" className="h-full w-full object-cover"/> : learner?.name?.[0]?.toUpperCase() || <CircleUserRound size={22}/>}</button>
            {accountOpen && <div className="absolute right-0 top-12 z-[130] w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><p className="px-3 py-2 text-xs font-bold text-slate-500">{learner?.name || "My account"}</p><Link href="/dashboard" onClick={() => setAccountOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">My dashboard</Link><Link href="/dashboard/profile" onClick={() => setAccountOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">My profile</Link><Link href="/forum" onClick={() => setAccountOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">My forum</Link><button type="button" onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"><LogOut size={16}/> Log out</button></div>}
          </div> : <>
            <div className="header-login-button"><Button href="/login" variant="outline">Login</Button></div>
            <div className="header-register-button"><Button href="/register">Register</Button></div>
          </>}

        </div>


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================== */}

        <button
          className={`mobile-menu-button ${
            open
              ? "mobile-menu-button-open"
              : ""
          }`}
          onClick={() => {
            setOpen((value) => !value);
            setCoursesOpen(false);
          }}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={
            open
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          type="button"
        >

          {open ? (
            <X
              size={21}
              strokeWidth={2.3}
            />
          ) : (
            <Menu
              size={21}
              strokeWidth={2.3}
            />
          )}

        </button>

      </div>


      {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}

      {open && (
        <div
          id="mobile-nav"
          className="mobile-navigation-wrapper"
        >

          <nav
            className="mobile-navigation"
            aria-label="Mobile navigation"
          >

            <div className="mobile-menu-top">
              <span>
                Navigation
              </span>
            </div>


            {navItems.map((item) =>
              item.label === "Courses" ? (

                <div
                  className="mobile-courses-group"
                  key={item.href}
                >

                  <button
                    className="mobile-nav-link mobile-courses-trigger"
                    type="button"
                    aria-expanded={coursesOpen}
                    onClick={() =>
                      setCoursesOpen(
                        (value) => !value
                      )
                    }
                  >

                    <span>
                      Courses
                    </span>

                    <ChevronDown
                      size={17}
                      className={
                        coursesOpen
                          ? "mobile-chevron-open"
                          : ""
                      }
                    />

                  </button>


                  {/* Mobile courses */}

                  {coursesOpen && (
                    <div className="mobile-course-list">

                      {courseMenu.map((course) => (

                        <section
                          key={course.slug}
                          className={`mobile-course-section ${
                            activeCourse.slug ===
                            course.slug
                              ? "active"
                              : ""
                          }`}
                        >

                          <button
                            className="mobile-course-name"
                            type="button"
                            onClick={() =>
                              setActiveCourse(
                                course
                              )
                            }
                            aria-expanded={
                              activeCourse.slug ===
                              course.slug
                            }
                          >

                            <span>
                              {course.title}
                            </span>

                            <ChevronDown
                              size={15}
                              className={
                                activeCourse.slug ===
                                course.slug
                                  ? "mobile-chevron-open"
                                  : ""
                              }
                            />

                          </button>


                          {/* Course links */}

                          {activeCourse.slug ===
                            course.slug && (

                            <div className="mobile-course-links">

                              <Link
                                href={course.href}
                                onClick={closeMenus}
                                className="mobile-course-overview"
                              >

                                <span>
                                  Overview
                                </span>

                                <ChevronRight
                                  size={14}
                                />

                              </Link>


                              {course.categories
                                .flatMap(
                                  (category) =>
                                    category.links
                                )
                                .map((link) => (

                                  <Link
                                    key={link.label}
                                    href={cmsHref(
                                      course.slug,
                                      link.label
                                    )}
                                    onClick={
                                      closeMenus
                                    }
                                  >

                                    <span>
                                      {link.label}
                                    </span>

                                    <ChevronRight
                                      size={13}
                                    />

                                  </Link>

                                ))}

                            </div>

                          )}

                        </section>

                      ))}

                    </div>
                  )}

                </div>

              ) : (

                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className="mobile-nav-link"
                >

                  <span>
                    {item.label}
                  </span>

                  <ChevronRight
                    size={15}
                    className="mobile-link-arrow"
                  />

                </Link>

              )
            )}


            {/* =================================================
                MOBILE ACTIONS
            ================================================== */}

            <div className="mobile-actions">

              {signedIn ? <div className="mobile-action-button flex items-center gap-3">
                <Link href="/dashboard" onClick={closeMenus} aria-label="My dashboard" className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-[#0B2A55] text-white">{learner?.avatarUrl ? <img src={learner.avatarUrl} alt="" className="h-full w-full object-cover"/> : learner?.name?.[0]?.toUpperCase() || <CircleUserRound size={20}/>}</Link>
                <Link href="/dashboard/profile" onClick={closeMenus} className="text-sm font-semibold">My profile</Link>
                <button type="button" onClick={logout} className="flex items-center gap-2"><LogOut size={16}/> Log out</button>
              </div> : <>
              <div className="mobile-action-button">
                <Button
                  href="/login"
                  variant="outline"
                >
                  Login
                </Button>

              </div>


              <div className="mobile-action-button">

                <Button href="/register">
                  Register
                </Button>

              </div>
              </>}

            </div>

          </nav>

        </div>
      )}

    </header>
  );
}
