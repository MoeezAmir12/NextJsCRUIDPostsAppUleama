"use client";

// This is used due to React Query being used in Client component which itself includes self required at Next.js pre-render
import dynamic from 'next/dynamic';

const AdminPage = dynamic(() => import('@/app/admin/AdminPage/AdminPage'), {
  ssr: false,
});

export default function AdminPageWrapper() {
    return <AdminPage />;
}

