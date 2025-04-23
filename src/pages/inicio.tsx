"use client"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Recycle, Clock, BarChart, Leaf, Cpu, ChevronRight, Database, Zap } from "lucide-react"

const Inicio = () => {
  const navigate = useNavigate()

  const handleLoginRedirect = () => {
    navigate("/login")
  }

  return (
    <div className="container-main">
      <style jsx>{`
        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          height: 70px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(56, 189, 248, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .navbar-logo-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(56, 189, 248, 0.3);
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
        }

        .navbar-logo-text {
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .navbar-links {
          display: flex;
          gap: 8px;
        }

        .navbar-link {
          color: #f8fafc;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.3s;
          font-size: 14px;
          font-weight: 500;
        }

        .navbar-link:hover {
          background: rgba(56, 189, 248, 0.1);
        }

        .navbar-link.active {
          background: rgba(56, 189, 248, 0.15);
          border-bottom: 2px solid #38bdf8;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
        }

        .navbar-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(56, 189, 248, 0.2);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
        }

        .navbar-button:hover {
          background: rgba(56, 189, 248, 0.3);
          transform: translateY(-2px);
        }

        .navbar-mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
        }

        .toggle-bar {
          width: 24px;
          height: 2px;
          background-color: #f8fafc;
          transition: all 0.3s;
        }

        .navbar-mobile-menu {
          display: none;
          flex-direction: column;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          padding: 16px;
          border-bottom: 1px solid rgba(56, 189, 248, 0.1);
        }

        .mobile-link {
          color: #f8fafc;
          text-decoration: none;
          padding: 12px 16px;
          border-radius: 8px;
          transition: all 0.3s;
          font-size: 14px;
          font-weight: 500;
        }

        .mobile-link:hover {
          background: rgba(56, 189, 248, 0.1);
        }

        .mobile-link.active {
          background: rgba(56, 189, 248, 0.15);
          border-left: 3px solid #38bdf8;
        }

        .mobile-button {
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(56, 189, 248, 0.2);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
        }

        .mobile-button:hover {
          background: rgba(56, 189, 248, 0.3);
        }

        @media (max-width: 768px) {
          .navbar-links, .navbar-actions {
            display: none;
          }
          
          .navbar-mobile-toggle {
            display: flex;
          }
          
          body.mobile-menu-open .navbar-mobile-menu {
            display: flex;
          }
          
          body.mobile-menu-open .toggle-bar:nth-child(1) {
            transform: translateY(6px) rotate(45deg);
          }
          
          body.mobile-menu-open .toggle-bar:nth-child(2) {
            opacity: 0;
          }
          
          body.mobile-menu-open .toggle-bar:nth-child(3) {
            transform: translateY(-6px) rotate(-45deg);
          }
        }
        /* Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #f8fafc;
          background-color: #0f172a;
        }
        
        /* Main Container */
        .container-main {
          min-height: 100vh;
          background: linear-gradient(to bottom, #0f172a, #1e293b);
          position: relative;
          overflow: hidden;
        }
        
        .container-main::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.15) 0%, transparent 25%),
            radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.1) 0%, transparent 30%);
          pointer-events: none;
        }
        
        /* Grid Background */
        .grid-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(30, 41, 59, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 41, 59, 0.5) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.2;
          z-index: 0;
        }
        
        /* Hero Section */
        .hero-section {
          position: relative;
          overflow: hidden;
        }
        
        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        
        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.1;
          filter: blur(2px);
        }
        
        .hero-content {
          padding-top: 150px;
          padding-bottom: 100px;
          padding-left: 16px;
          padding-right: 16px;
          max-width: 1280px;
          margin: 0 auto;
        }
        
        .hero-text {
          text-align: center;
        }
        
        .logo-container {
          margin-bottom: 32px;
          display: flex;
          justify-content: center;
          position: relative;
        }
        
        .logo {
          height: 100px;
          width: 100px;
          border-radius: 50%;
          border: 4px solid rgba(14, 165, 233, 0.3);
          box-shadow: 
            0 0 20px rgba(14, 165, 233, 0.5),
            0 0 40px rgba(14, 165, 233, 0.2);
          position: relative;
          z-index: 2;
          background-color: #0f172a;
          padding: 4px;
        }
        
        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%);
          z-index: 1;
          animation: pulse 4s infinite;
        }
        
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
        }
        
        .hero-title {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 16px;
          color: #f8fafc;
          text-shadow: 0 0 10px rgba(14, 165, 233, 0.3);
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        
        .text-blue {
          color: #38bdf8;
          position: relative;
          display: inline-block;
        }
        
        .text-blue::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #38bdf8, transparent);
        }
        
        .hero-subtitle {
          font-size: 20px;
          color: #94a3b8;
          max-width: 768px;
          margin: 0 auto 48px auto;
          line-height: 1.6;
        }
        
        .button-primary {
          display: inline-flex;
          align-items: center;
          padding: 16px 32px;
          font-size: 18px;
          font-weight: 500;
          color: #f8fafc;
          background: linear-gradient(135deg, #0ea5e9, #2563eb);
          border-radius: 8px;
          border: none;
          cursor: pointer;
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(14, 165, 233, 0.3),
            0 0 20px rgba(14, 165, 233, 0.2);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .button-primary::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.6s;
          z-index: -1;
        }
        
        .button-primary:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 15px 25px -5px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(14, 165, 233, 0.4),
            0 0 30px rgba(14, 165, 233, 0.3);
        }
        
        .button-primary:hover::before {
          left: 100%;
        }
        
        .button-primary:focus {
          outline: none;
          box-shadow: 
            0 0 0 2px #0f172a, 
            0 0 0 4px rgba(14, 165, 233, 0.5);
        }
        
        .button-icon {
          margin-left: 8px;
          height: 20px;
          width: 20px;
        }
        
        /* Content Container */
        .content-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 64px 16px;
          position: relative;
          z-index: 1;
        }
        
        /* What is FiltroMatic Section */
        .section-what-is {
          max-width: 1152px;
          margin: 0 auto 100px auto;
          position: relative;
        }
        
        .section-glow {
          position: absolute;
          top: 50%;
          left: 0;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%);
          z-index: -1;
          transform: translateY(-50%);
          filter: blur(40px);
        }
        
        .flex-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          position: relative;
          z-index: 1;
        }
        
        .image-container {
          width: 100%;
          position: relative;
        }
        
        .section-image {
          border-radius: 12px;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(14, 165, 233, 0.2);
          width: 100%;
          height: auto;
          transition: all 0.3s;
          position: relative;
          z-index: 1;
        }
        
        .image-container::before {
          content: "";
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 1px solid rgba(14, 165, 233, 0.2);
          border-radius: 16px;
          z-index: 0;
        }
        
        .image-container::after {
          content: "";
          position: absolute;
          top: 10px;
          left: 10px;
          width: calc(100% - 20px);
          height: calc(100% - 20px);
          border: 1px dashed rgba(14, 165, 233, 0.3);
          border-radius: 8px;
          z-index: 2;
          pointer-events: none;
        }
        
        .text-container {
          width: 100%;
        }
        
        .section-title {
          font-size: 32px;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 24px;
          position: relative;
          display: inline-block;
        }
        
        .section-title::before {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #0ea5e9, transparent);
          border-radius: 3px;
        }
        
        .section-text {
          color: #94a3b8;
          line-height: 1.75;
          font-size: 18px;
          margin-bottom: 24px;
        }
        
        .section-text:last-child {
          margin-bottom: 0;
        }
        
        /* Objective Section */
        .section-objective {
          max-width: 1152px;
          margin: 0 auto 100px auto;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(14, 165, 233, 0.1);
          border-radius: 16px;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(14, 165, 233, 0.1);
          overflow: hidden;
          position: relative;
        }
        
        .section-objective::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, transparent 100%),
            radial-gradient(circle at 100% 100%, rgba(14, 165, 233, 0.1) 0%, transparent 50%);
          z-index: 0;
        }
        
        .flex-container-reverse {
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }
        
        .image-container-objective {
          width: 100%;
          position: relative;
        }
        
        .objective-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          filter: saturate(1.2) contrast(1.1);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(15, 23, 42, 1), transparent);
          z-index: 1;
        }
        
        .text-container-objective {
          width: 100%;
          padding: 32px;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        
        /* Benefits Section */
        .section-benefits {
          max-width: 1152px;
          margin: 0 auto 100px auto;
          position: relative;
        }
        
        .benefits-title {
          font-size: 32px;
          font-weight: 700;
          text-align: center;
          color: #f8fafc;
          margin-bottom: 60px;
          position: relative;
        }
        
        .benefits-title::after {
          content: "";
          position: absolute;
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
          border-radius: 3px;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        
        .benefit-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(14, 165, 233, 0.1);
          border-radius: 12px;
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(14, 165, 233, 0.05);
          padding: 32px 24px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .benefit-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #0ea5e9, #2563eb);
          opacity: 0;
          transition: all 0.3s;
        }
        
        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(14, 165, 233, 0.1),
            0 0 20px rgba(14, 165, 233, 0.1);
        }
        
        .benefit-card:hover::before {
          opacity: 1;
        }
        
        .benefit-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          position: relative;
          z-index: 1;
        }
        
        .benefit-icon-container {
          margin-bottom: 20px;
          padding: 16px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(14, 165, 233, 0.2);
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .benefit-icon {
          height: 32px;
          width: 32px;
        }
        
        .benefit-icon.green {
          color: #10b981;
        }
        
        .benefit-icon.blue {
          color: #0ea5e9;
        }
        
        .benefit-icon.purple {
          color: #8b5cf6;
        }
        
        .benefit-icon.orange {
          color: #f97316;
        }
        
        .benefit-icon.green-dark {
          color: #059669;
        }
        
        .benefit-icon.cyan {
          color: #06b6d4;
        }
        
        .benefit-icon-img {
          height: 32px;
          width: 32px;
        }
        
        .benefit-card-title {
          font-size: 20px;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
        }
        
        .benefit-description {
          color: #94a3b8;
          line-height: 1.6;
        }
        
        /* CTA Section */
        .cta-section {
          max-width: 896px;
          margin: 0 auto;
          text-align: center;
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(5, 150, 105, 0.2));
          border: 1px solid rgba(14, 165, 233, 0.2);
          border-radius: 16px;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(14, 165, 233, 0.1);
          padding: 60px 24px 80px;
          color: #f8fafc;
          position: relative;
          overflow: hidden;
        }
        
        .cta-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(5, 150, 105, 0.2) 0%, transparent 50%);
          z-index: 0;
        }
        
        .cta-section::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: repeating-linear-gradient(
            45deg,
            rgba(14, 165, 233, 0.05),
            rgba(14, 165, 233, 0.05) 1px,
            transparent 1px,
            transparent 10px
          );
          animation: moveBackground 20s linear infinite;
          z-index: 0;
        }
        
        @keyframes moveBackground {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .cta-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }
        
        .cta-text {
          font-size: 20px;
          opacity: 0.9;
          margin-bottom: 40px;
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }
        
        .button-secondary {
          display: inline-flex;
          align-items: center;
          padding: 16px 32px;
          font-size: 18px;
          font-weight: 500;
          color: #0ea5e9;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(14, 165, 233, 0.3);
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(14, 165, 233, 0.1);
          transition: all 0.3s;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        
        .button-secondary::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.1), transparent);
          transition: all 0.6s;
          z-index: -1;
        }
        
        .button-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 15px 25px -5px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(14, 165, 233, 0.2);
          color: #38bdf8;
        }
        
        .button-secondary:hover::before {
          left: 100%;
        }
        
        .button-secondary:focus {
          outline: none;
          box-shadow: 
            0 0 0 2px #0f172a, 
            0 0 0 4px rgba(14, 165, 233, 0.3);
        }
        
        /* Footer */
        .footer {
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 1));
          backdrop-filter: blur(10px);
          color: #f8fafc;
          padding: 60px 16px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(14, 165, 233, 0.1);
        }
        
        .footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 10% 0%, rgba(14, 165, 233, 0.1) 0%, transparent 30%),
            radial-gradient(circle at 90% 100%, rgba(5, 150, 105, 0.1) 0%, transparent 30%);
          z-index: 0;
        }
        
        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          position: relative;
          z-index: 1;
        }
        
        .footer-logo {
          margin-bottom: 24px;
          position: relative;
        }
        
        .footer-logo-img {
          height: 70px;
          width: 70px;
          border-radius: 50%;
          border: 2px solid rgba(14, 165, 233, 0.2);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.2);
          padding: 2px;
          background-color: #0f172a;
        }
        
        .footer-text {
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.6;
        }
        
        .developers {
          font-size: 16px;
          font-weight: 600;
          color: #0ea5e9;
          margin-top: 16px;
          position: relative;
          display: inline-block;
        }
        
        .developers::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
        }
        
        .developer-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 16px;
          text-align: center;
        }
        
        .developer-name {
          font-size: 14px;
          color: #94a3b8;
          transition: all 0.3s;
        }
        
        .developer-name:hover {
          color: #e2e8f0;
        }
        
        .footer-divider {
          height: 1px;
          width: 100%;
          background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.2), transparent);
          margin: 24px 0;
        }
        
        .footer-tagline {
          font-size: 14px;
          color: #64748b;
          margin-top: 8px;
        }
        
        /* Tech Elements */
        .tech-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(14, 165, 233, 0.3);
          opacity: 0.5;
          z-index: 0;
        }
        
        .tech-circle-1 {
          top: 20%;
          right: 10%;
          width: 200px;
          height: 200px;
          animation: rotate 30s linear infinite;
        }
        
        .tech-circle-2 {
          bottom: 30%;
          left: 5%;
          width: 300px;
          height: 300px;
          animation: rotate 40s linear infinite reverse;
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Responsive Styles */
        @media (min-width: 768px) {
          .hero-content {
            padding-top: 180px;
            padding-bottom: 160px;
            padding-left: 24px;
            padding-right: 24px;
          }
        
          .hero-title {
            font-size: 60px;
          }
        
          .hero-subtitle {
            font-size: 24px;
          }
        
          .flex-container {
            flex-direction: row;
          }
        
          .image-container {
            width: 50%;
          }
        
          .text-container {
            width: 50%;
          }
        
          .flex-container-reverse {
            flex-direction: row-reverse;
          }
        
          .image-container-objective {
            width: 40%;
          }
        
          .objective-image {
            height: 100%;
          }
        
          .text-container-objective {
            width: 60%;
            padding: 48px;
          }
        
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        
          .cta-section {
            padding: 80px 64px;
          }
        
          .footer-content {
            flex-direction: row;
            justify-content: space-between;
          }
        
          .footer-logo {
            margin-bottom: 0;
          }
        
          .footer-text {
            text-align: right;
          }
        }
        
        @media (min-width: 1024px) {
          .benefits-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        
          .section-title {
            font-size: 36px;
          }
        
          .cta-title {
            font-size: 36px;
          }
        }
      `}</style>

      <div className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src="../LogoFM.jpeg" alt="Logo FiltroMatic" className="navbar-logo-image" />
            <span className="navbar-logo-text">FiltroMatic</span>
          </div>
          <div className="navbar-links">
            <a href="#" className="navbar-link active">
              Inicio
            </a>
            <a href="developers" className="navbar-link">
            Equipo
            </a>
            
          </div>
          <div className="navbar-actions">
            <button onClick={handleLoginRedirect} className="navbar-button">
              Acceder
            </button>
          </div>
          <div className="navbar-mobile-toggle" onClick={() => document.body.classList.toggle("mobile-menu-open")}>
            <div className="toggle-bar"></div>
            <div className="toggle-bar"></div>
            <div className="toggle-bar"></div>
          </div>
        </div>
        <div className="navbar-mobile-menu">
          <a href="#" className="mobile-link active">
            Inicio
          </a>
          <a href="developers" className="mobile-link">
          Equipo
          </a>
         
          <button onClick={handleLoginRedirect} className="mobile-button">
            Acceder
          </button>
        </div>
      </div>

      {/* Tech Background Elements */}
      <div className="grid-background"></div>
      <div className="tech-circle tech-circle-1"></div>
      <div className="tech-circle tech-circle-2"></div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <img src="../banda.bmp?height=800&width=1600" alt="Fondo de reciclaje" className="hero-image" />
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="logo-container">
              <div className="logo-glow"></div>
              <img src="../LogoFM.jpeg" alt="Logo FiltroMatic" className="logo" />
            </div>
            <h1 className="hero-title">
              Bienvenido a <span className="text-blue">FiltroMatic</span>
            </h1>
            <p className="hero-subtitle">
              Automatiza, clasifica y transforma la gestión de residuos con tecnología de vanguardia e inteligencia
              artificial.
            </p>
            <button onClick={handleLoginRedirect} className="button-primary">
              Acceder al Sistema
              <ArrowRight className="button-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        {/* What is FiltroMatic Section */}
        <div className="section-what-is">
          <div className="section-glow"></div>
          <div className="flex-container">
            <div className="image-container">
              <img
                src="../quees.jpeg?height=400&width=600"
                alt="Sistema FiltroMatic en acción"
                className="section-image"
              />
            </div>
            <div className="text-container">
              <h2 className="section-title">
                ¿Qué es <span className="text-blue">FiltroMatic</span>?
              </h2>
              <p className="section-text">
                FiltroMatic es una banda transportadora inteligente capaz de clasificar residuos en tiempo real
                utilizando sensores de color avanzados y algoritmos de procesamiento de datos.
              </p>
              <p className="section-text">
                El sistema detecta automáticamente el color del objeto que se transporta y lo categoriza según criterios
                predefinidos, almacenando toda la información en una base de datos para su posterior análisis y control
                mediante dashboards interactivos.
              </p>
            </div>
          </div>
        </div>

        {/* Objective Section */}
        <div className="section-objective">
          <div className="flex-container-reverse">
            <div className="image-container-objective">
              <img
                src="../objetivo.jpeg?height=500&width=400"
                alt="Objetivo de sustentabilidad"
                className="objective-image"
              />
              <div className="image-overlay"></div>
            </div>
            <div className="text-container-objective">
              <div>
                <h2 className="section-title">Nuestro Objetivo</h2>
                <p className="section-text">
                  Optimizar el proceso de separación de residuos mediante un sistema automatizado que disminuya el error
                  humano y fomente la sustentabilidad ambiental. FiltroMatic es ideal para centros de reciclaje,
                  instituciones educativas y plantas de procesamiento que buscan implementar soluciones tecnológicas de
                  vanguardia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="section-benefits">
          <h2 className="benefits-title">
            Beneficios de <span className="text-blue">FiltroMatic</span>
          </h2>

          <div className="benefits-grid">
            {[
              {
                icon: <Recycle className="benefit-icon green" />,
                title: "Clasificación Eficiente",
                description:
                  "Automatiza la clasificación de residuos con precisión y velocidad superior a los métodos manuales.",
              },
              {
                icon: <Database className="benefit-icon blue" />,
                title: "Almacenamiento Seguro",
                description:
                  "Guarda todos los datos de manera segura y ordenada para su posterior análisis y trazabilidad.",
              },
              {
                icon: <Clock className="benefit-icon purple" />,
                title: "Ahorro de Tiempo",
                description:
                  "Reduce significativamente los tiempos y costos operativos en el proceso de clasificación.",
              },
              {
                icon: <BarChart className="benefit-icon orange" />,
                title: "Control Intuitivo",
                description: "Interfaz fácil de usar para monitorear y controlar todo el proceso en tiempo real.",
              },
              {
                icon: <Leaf className="benefit-icon green-dark" />,
                title: "Impacto Ambiental",
                description:
                  "Contribuye activamente al cuidado del medio ambiente mejorando la eficiencia del reciclaje.",
              },
              {
                icon: <Cpu className="benefit-icon cyan" />,
                title: "Tecnología Avanzada",
                description:
                  "Utiliza sensores de última generación y algoritmos inteligentes para una detección precisa de materiales.",
              },
            ].map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-content">
                  <div className="benefit-icon-container">{benefit.icon}</div>
                  <h3 className="benefit-card-title">
                    {benefit.title} <ChevronRight size={16} className="ml-1" />
                  </h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">¿Listo para revolucionar tu gestión de residuos?</h2>
          <p className="cta-text">Únete a las organizaciones que ya están optimizando sus procesos con FiltroMatic.</p>
          <button onClick={handleLoginRedirect} className="button-secondary">
            Comenzar Ahora
            <Zap className="button-icon" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src="../LogoFM.jpeg" alt="Logo FiltroMatic" className="footer-logo-img" />
          </div>
          <p className="footer-text">© {new Date().getFullYear()} FiltroMatic. Todos los derechos reservados.</p>
          <div className="footer-divider"></div>
          <p className="developers">Desarrollado por:</p>
          <div className="developer-list">
            <p className="developer-name">Samuel Antonio Garduño Viviana</p>
            <p className="developer-name">Jose Luis Guadarrama Hernandez</p>
            <p className="developer-name">Brenda Jhedai Gonzalez Montes</p>
          </div>
          <p className="footer-tagline">Tecnología para un futuro más limpio y sostenible</p>
        </div>
      </footer>
    </div>
  )
}

export default Inicio
