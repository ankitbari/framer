// Framer Code Component for Skillpath Landing Page
// This component fetches course data and displays it in a responsive grid

import { addPropertyControls, ControlType } from "framer"
import { useEffect, useState } from "react"

const API_BASE_URL = "https://syncsphere-hiv6.onrender.com"

export default function SkillpathLanding(props) {
    const {
        headingText,
        subheadingText,
        buttonText,
        showRefundableBadge,
        gridGap,
        cardBackgroundColor,
    } = props

    // State for courses data
    const [courses, setCourses] = useState([])
    const [countryCode, setCountryCode] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [retryCount, setRetryCount] = useState(0)

    // Fetch country code
    const fetchCountryCode = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/assignment/country-code`, {
                method: "GET",
            })
            if (!response.ok) {
                throw new Error(`Country API failed: ${response.status}`)
            }
            const data = await response.json()
            return data.country_code
        } catch (err) {
            console.error("Error fetching country code:", err)
            return null
        }
    }

    // Fetch courses
    const fetchCourses = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/assignment/course-data`, {
                method: "GET",
            })
            if (!response.ok) {
                throw new Error(`Courses API failed: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (err) {
            console.error("Error fetching courses:", err)
            throw err
        }
    }

    // Main data fetch function
    const fetchData = async () => {
        setLoading(true)
        setError(null)

        try {
            // Fetch both endpoints in parallel
            const [country, coursesData] = await Promise.all([
                fetchCountryCode(),
                fetchCourses(),
            ])

            setCountryCode(country || "IN") // Default to IN if country fetch fails
            setCourses(coursesData || [])
        } catch (err) {
            setError(err.message)
            setCourses([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [retryCount])

    // Format price based on country code
    const formatPrice = (course, code) => {
        if (code === "IN") {
            // Convert paise to rupees (100 paise = 1 rupee)
            const rupees = course.pricePaise / 100
            return `₹${rupees.toLocaleString("en-IN")}`
        } else {
            // Convert cents to dollars (100 cents = 1 dollar)
            const dollars = course.priceUsdCents / 100
            return `$${dollars.toLocaleString("en-US")}`
        }
    }

    // Truncate description to 2 lines
    const truncateDescription = (text, maxLength = 150) => {
        if (text.length <= maxLength) {
            return text
        }
        return text.slice(0, maxLength).trim() + "..."
    }

    // Handle retry
    const handleRetry = () => {
        setRetryCount(prev => prev + 1)
    }

    // Styles
    const styles = {
        container: {
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        hero: {
            padding: "80px 20px",
            textAlign: "center",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e9ecef",
        },
        heroHeading: {
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "700",
            color: "#1a1a2e",
            margin: "0 0 16px 0",
            lineHeight: "1.2",
        },
        heroSubheading: {
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "#6c757d",
            margin: "0 0 32px 0",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
        },
        heroButton: {
            padding: "16px 32px",
            fontSize: "1rem",
            fontWeight: "600",
            color: "#ffffff",
            backgroundColor: "#4f46e5",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.2s",
        },
        coursesSection: {
            padding: "60px 20px",
            maxWidth: "1400px",
            margin: "0 auto",
        },
        coursesTitle: {
            fontSize: "2rem",
            fontWeight: "600",
            color: "#1a1a2e",
            marginBottom: "40px",
            textAlign: "center",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: `${gridGap}px`,
        },
        "@media (min-width: 768px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
        },
        "@media (min-width: 1024px)": {
            gridTemplateColumns: "repeat(3, 1fr)",
        },
        card: {
            backgroundColor: cardBackgroundColor,
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)",
            transition: "transform 0.2s, box-shadow 0.2s",
            display: "flex",
            flexDirection: "column",
        },
        cardName: {
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#1a1a2e",
            margin: "0 0 12px 0",
        },
        cardDescription: {
            fontSize: "0.95rem",
            color: "#6c757d",
            margin: "0 0 16px 0",
            lineHeight: "1.5",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        cardMeta: {
            fontSize: "0.875rem",
            color: "#495057",
            marginBottom: "12px",
            backgroundColor: "#f1f3f4",
            padding: "6px 12px",
            borderRadius: "6px",
            alignSelf: "flex-start",
        },
        cardPrice: {
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#4f46e5",
            marginTop: "auto",
        },
        refundableBadge: {
            display: "inline-block",
            backgroundColor: "#d1fae5",
            color: "#065f46",
            fontSize: "0.75rem",
            fontWeight: "600",
            padding: "4px 8px",
            borderRadius: "4px",
            marginTop: "8px",
            alignSelf: "flex-start",
        },
        loadingContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 20px",
        },
        spinner: {
            width: "48px",
            height: "48px",
            border: "4px solid #e9ecef",
            borderTop: "4px solid #4f46e5",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
        },
        loadingText: {
            marginTop: "16px",
            color: "#6c757d",
            fontSize: "1rem",
        },
        errorContainer: {
            textAlign: "center",
            padding: "60px 20px",
            backgroundColor: "#fef2f2",
            borderRadius: "12px",
            border: "1px solid #fecaca",
        },
        errorTitle: {
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#dc2626",
            marginBottom: "8px",
        },
        errorMessage: {
            color: "#991b1b",
            marginBottom: "24px",
        },
        retryButton: {
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: "600",
            color: "#ffffff",
            backgroundColor: "#dc2626",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
        },
        emptyContainer: {
            textAlign: "center",
            padding: "60px 20px",
            color: "#6c757d",
        },
        emptyTitle: {
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "8px",
        },
        footer: {
            backgroundColor: "#1a1a2e",
            color: "#ffffff",
            padding: "40px 20px",
            textAlign: "center",
        },
        footerLinks: {
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            marginBottom: "24px",
            flexWrap: "wrap",
        },
        footerLink: {
            color: "#a5b4fc",
            textDecoration: "none",
            fontSize: "0.95rem",
            transition: "color 0.2s",
        },
        footerCopyright: {
            color: "#6c757d",
            fontSize: "0.875rem",
            margin: "0",
        },
    }

    // Loading state
    if (loading) {
        return (
            <div style={styles.container}>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
                
                {/* Hero Section - Placeholder */}
                <section style={styles.hero}>
                    <h1 style={{...styles.heroHeading, opacity: 0.3}}>{headingText}</h1>
                    <p style={{...styles.heroSubheading, opacity: 0.3}}>{subheadingText}</p>
                    <button style={{...styles.heroButton, opacity: 0.3}}>{buttonText}</button>
                </section>

                {/* Courses Section - Loading */}
                <section style={styles.coursesSection}>
                    <h2 style={styles.coursesTitle}>Our Courses</h2>
                    <div style={styles.loadingContainer}>
                        <div style={styles.spinner}></div>
                        <p style={styles.loadingText}>Loading courses...</p>
                    </div>
                </section>

                {/* Footer */}
                <footer style={styles.footer}>
                    <div style={styles.footerLinks}>
                        <a href="#" style={styles.footerLink}>About Us</a>
                        <a href="#" style={styles.footerLink}>Contact</a>
                        <a href="#" style={styles.footerLink}>Privacy Policy</a>
                    </div>
                    <p style={styles.footerCopyright}>© 2024 Skillpath. All rights reserved.</p>
                </footer>
            </div>
        )
    }

    // Error state (when courses fail to load)
    if (error && courses.length === 0) {
        return (
            <div style={styles.container}>
                {/* Hero Section */}
                <section style={styles.hero}>
                    <h1 style={styles.heroHeading}>{headingText}</h1>
                    <p style={styles.heroSubheading}>{subheadingText}</p>
                    <button style={styles.heroButton}>{buttonText}</button>
                </section>

                {/* Courses Section - Error */}
                <section style={styles.coursesSection}>
                    <h2 style={styles.coursesTitle}>Our Courses</h2>
                    <div style={styles.errorContainer}>
                        <h3 style={styles.errorTitle}>Failed to load courses</h3>
                        <p style={styles.errorMessage}>
                            We're having trouble fetching the courses. Please try again.
                        </p>
                        <button style={styles.retryButton} onClick={handleRetry}>
                            Try Again
                        </button>
                    </div>
                </section>

                {/* Footer */}
                <footer style={styles.footer}>
                    <div style={styles.footerLinks}>
                        <a href="#" style={styles.footerLink}>About Us</a>
                        <a href="#" style={styles.footerLink}>Contact</a>
                        <a href="#" style={styles.footerLink}>Privacy Policy</a>
                    </div>
                    <p style={styles.footerCopyright}>© 2024 Skillpath. All rights reserved.</p>
                </footer>
            </div>
        )
    }

    // Empty state (no courses)
    if (courses.length === 0) {
        return (
            <div style={styles.container}>
                {/* Hero Section */}
                <section style={styles.hero}>
                    <h1 style={styles.heroHeading}>{headingText}</h1>
                    <p style={styles.heroSubheading}>{subheadingText}</p>
                    <button style={styles.heroButton}>{buttonText}</button>
                </section>

                {/* Courses Section - Empty */}
                <section style={styles.coursesSection}>
                    <h2 style={styles.coursesTitle}>Our Courses</h2>
                    <div style={styles.emptyContainer}>
                        <h3 style={styles.emptyTitle}>No courses available</h3>
                        <p>Check back later for new courses!</p>
                    </div>
                </section>

                {/* Footer */}
                <footer style={styles.footer}>
                    <div style={styles.footerLinks}>
                        <a href="#" style={styles.footerLink}>About Us</a>
                        <a href="#" style={styles.footerLink}>Contact</a>
                        <a href="#" style={styles.footerLink}>Privacy Policy</a>
                    </div>
                    <p style={styles.footerCopyright}>© 2024 Skillpath. All rights reserved.</p>
                </footer>
            </div>
        )
    }

    // Success state - render courses grid
    // Dynamic grid styles based on breakpoint
    const getGridStyles = () => {
        const baseStyles = {
            ...styles.grid,
            gridTemplateColumns: "repeat(1, 1fr)", // Mobile: 1 column
        }
        
        // Note: In actual Framer environment, media queries work differently
        // This is a simplified version - Framer handles responsive breakpoints automatically
        return baseStyles
    }

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <section style={styles.hero}>
                <h1 style={styles.heroHeading}>{headingText}</h1>
                <p style={styles.heroSubheading}>{subheadingText}</p>
                <button style={styles.heroButton}>{buttonText}</button>
            </section>

            {/* Courses Section */}
            <section style={styles.coursesSection}>
                <h2 style={styles.coursesTitle}>Explore Our Courses</h2>
                
                {/* Responsive Grid using CSS Grid with media query */}
                <style>{`
                    .courses-grid {
                        display: grid;
                        gap: ${gridGap}px;
                        grid-template-columns: repeat(1, 1fr);
                    }
                    @media (min-width: 768px) {
                        .courses-grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }
                    @media (min-width: 1024px) {
                        .courses-grid {
                            grid-template-columns: repeat(3, 1fr);
                        }
                    }
                `}</style>

                <div className="courses-grid">
                    {courses.map((course) => (
                        <div 
                            key={course.mangoId || course.courseCode} 
                            style={styles.card}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)"
                                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.1)"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)"
                                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.07)"
                            }}
                        >
                            <h3 style={styles.cardName}>{course.courseName}</h3>
                            
                            <p style={styles.cardDescription}>
                                {truncateDescription(course.description)}
                            </p>
                            
                            {/* Show mainCategory as the additional field - learners want to know the category */}
                            <span style={styles.cardMeta}>
                                {course.mainCategory}
                            </span>
                            
                            {/* Refundable badge (optional based on property control) */}
                            {showRefundableBadge && course.refundable && (
                                <span style={styles.refundableBadge}>
                                    ✓ Refundable
                                </span>
                            )}
                            
                            <p style={styles.cardPrice}>
                                {formatPrice(course, countryCode)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                <div style={styles.footerLinks}>
                    <a href="#" style={styles.footerLink}>About Us</a>
                    <a href="#" style={styles.footerLink}>Contact</a>
                    <a href="#" style={styles.footerLink}>Privacy Policy</a>
                </div>
                <p style={styles.footerCopyright}>© 2024 Skillpath. All rights reserved.</p>
            </footer>
        </div>
    )
}

// Property Controls for Framer Panel
addPropertyControls(SkillpathLanding, {
    headingText: {
        type: ControlType.String,
        title: "Hero Heading",
        defaultValue: "Learn Skills That Matter",
    },
    subheadingText: {
        type: ControlType.String,
        title: "Hero Subheading",
        defaultValue: "Master in-demand skills with our expert-led courses designed for real-world success.",
    },
    buttonText: {
        type: ControlType.String,
        title: "Button Text",
        defaultValue: "Explore Courses",
    },
    showRefundableBadge: {
        type: ControlType.Boolean,
        title: "Show Refundable Badge",
        defaultValue: true,
    },
    gridGap: {
        type: ControlType.Number,
        title: "Grid Gap (px)",
        defaultValue: 24,
        min: 8,
        max: 64,
    },
    cardBackgroundColor: {
        type: ControlType.Color,
        title: "Card Background",
        defaultValue: "#ffffff",
    },
})
