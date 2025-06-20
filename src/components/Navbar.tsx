'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';

const supabase = createClient();

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // 画面幅が640px以上になったらメニューを自動で閉じる
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('ログアウトしました');
      router.push('/');
    } catch {
      toast.error('ログアウトに失敗しました');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-white shadow relative z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-row justify-between items-center h-16 w-full">
          <div className="flex items-center flex-shrink-0">
            <span className="text-base sm:text-xl font-bold text-indigo-800 whitespace-nowrap">TORAVEL PLANNER</span>
          </div>
          {/* PCサイズ: メールアドレス＋ログアウトボタン */}
          <div className="hidden sm:flex items-center min-w-0 gap-x-2">
            <span className="text-gray-600 text-xs sm:text-base mr-2 sm:mr-4 truncate min-w-0 max-w-[100px] sm:max-w-xs">{user.email}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-2 py-1 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex-shrink-0"
            >
              ログアウト
            </button>
          </div>
          {/* スマホサイズ: ハンバーガーメニュー */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-800 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-label="メニューを開く"
            >
              {/* ハンバーガーアイコン */}
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* ドロワーメニュー（スマホ用） */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/75" onClick={() => setMenuOpen(false)}>
          <div
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-6 animate-slide-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 text-sm break-all">{user.email}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                ログアウト
              </button>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-indigo-800 text-sm underline self-end"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
} 
