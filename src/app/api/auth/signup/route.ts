import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'メールアドレスとパスワードは必須です' },
        { status: 400 }
      );
    }

    // 既存のメールアドレスかどうかをチェック
    const { data: checkData, error: checkError } = await supabase.rpc('check_email', {
      email_address: email
    });

    if (checkError) {
      console.error('Check email error:', checkError);
      return NextResponse.json(
        { error: 'メールアドレスの確認中にエラーが発生しました' },
        { status: 500 }
      );
    }

    // 既存のメールアドレスの場合
    if (checkData > 0) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に登録されています。ログインページからログインしてください。' },
        { status: 400 }
      );
    }

    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: email,
        },
      },
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'アカウントが作成されました。メールボックスを確認して、確認メールのリンクをクリックしてください。メール確認が完了するまでログインできません。' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
} 
