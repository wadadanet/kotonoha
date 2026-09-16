/**
 * データバリデーションテスト (test.js)
 * books.js のデータ整合性を検証します。
 *
 * 検証項目:
 * - 全作品の必須プロパティ（id, title, english, author, authorEn, minutes, source, credit, segments）
 * - 作品 id の一意性（重複なし）
 * - 全セグメントのデータ構造（[日本語本文, 英語訳, 単語マッピング配列]）
 * - 各単語マッピングの形式（[日本語, 英語, レベル]）および日本語が本文に完全一致（含まれる）していること
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

function runTests() {
  console.log('--- ことのは データバリデーションテスト ---');

  // 1. books.js の読み込み
  const booksPath = path.join(__dirname, 'books.js');
  assert(fs.existsSync(booksPath), `books.js が見つかりません: ${booksPath}`);
  const code = fs.readFileSync(booksPath, 'utf8');

  const sandbox = {};
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);

  const books = sandbox.BOOKS;
  assert(Array.isArray(books), 'BOOKS が配列ではありません');
  assert(books.length > 0, '作品が 0 件です');

  const REQUIRED_PROPERTIES = [
    'id',
    'title',
    'english',
    'author',
    'authorEn',
    'minutes',
    'source',
    'credit',
    'segments',
  ];

  const seenIds = new Set();
  let totalSegments = 0;
  let totalWords = 0;

  books.forEach((book, bookIdx) => {
    const bookLabel = `作品 #${bookIdx + 1} (${book.id || 'id未定義'}: ${book.title || 'タイトル未定義'})`;

    // 必須プロパティの存在・非空チェック
    REQUIRED_PROPERTIES.forEach(prop => {
      assert(
        book[prop] !== undefined && book[prop] !== null && book[prop] !== '',
        `${bookLabel}: 必須プロパティ '${prop}' が存在しないか空です`
      );
    });

    // 文字列プロパティの型チェック
    [
      'id',
      'title',
      'english',
      'author',
      'authorEn',
      'minutes',
      'source',
      'credit',
    ].forEach(prop => {
      assert.strictEqual(
        typeof book[prop],
        'string',
        `${bookLabel}: '${prop}' は文字列である必要があります`
      );
    });

    // id 重複チェック
    assert(
      !seenIds.has(book.id),
      `${bookLabel}: id '${book.id}' が重複しています`
    );
    seenIds.add(book.id);

    // segments のチェック
    assert(
      Array.isArray(book.segments) && book.segments.length > 0,
      `${bookLabel}: segments は 1 件以上の配列である必要があります`
    );

    book.segments.forEach((seg, segIdx) => {
      totalSegments++;
      const segLabel = `${bookLabel} セグメント #${segIdx + 1}`;

      assert(
        Array.isArray(seg) && seg.length === 3,
        `${segLabel}: セグメントは [本文, 英訳, 単語マッピング] の 3 要素配列である必要があります`
      );

      const [jaText, enText, words] = seg;
      assert(
        typeof jaText === 'string' && jaText.length > 0,
        `${segLabel}: 日本語本文が空または文字列ではありません`
      );
      assert(
        typeof enText === 'string' && enText.length > 0,
        `${segLabel}: 英語訳が空または文字列ではありません`
      );
      assert(
        Array.isArray(words),
        `${segLabel}: 単語マッピングが配列ではありません`
      );

      words.forEach((w, wordIdx) => {
        totalWords++;
        const wordLabel = `${segLabel} 単語 #${wordIdx + 1}`;

        assert(
          Array.isArray(w) && w.length === 3,
          `${wordLabel}: 単語マッピングは [日本語, 英語, レベル] の 3 要素配列である必要があります`
        );

        const [wJa, wEn, wLevel] = w;
        assert(
          typeof wJa === 'string' && wJa.length > 0,
          `${wordLabel}: 日本語単語が空または文字列ではありません`
        );
        assert(
          typeof wEn === 'string' && wEn.length > 0,
          `${wordLabel}: 英語単語が空または文字列ではありません`
        );
        assert(
          Number.isInteger(wLevel) && wLevel >= 0 && wLevel <= 10,
          `${wordLabel}: レベルは 0〜10 の整数である必要があります (値: ${wLevel})`
        );

        // 各単語マッピングの日本語が本文に完全一致していることを検証
        assert(
          jaText.includes(wJa),
          `${wordLabel}: 日本語単語 '${wJa}' がセグメント本文 '${jaText}' に含まれていません`
        );
      });
    });
  });

  console.log('✓ 全作品の必須プロパティ検証 PASS');
  console.log(`✓ 作品 id 一意性検証 PASS (${books.length} 作品)`);
  console.log(`✓ 全セグメント構造検証 PASS (${totalSegments} セグメント)`);
  console.log(`✓ 全単語マッピングの本文一致検証 PASS (${totalWords} 単語)`);
  console.log('--- すべてのデータバリデーションテストが成功しました ---');
}

try {
  runTests();
  process.exit(0);
} catch (err) {
  console.error('テスト失敗:', err.message);
  process.exit(1);
}
