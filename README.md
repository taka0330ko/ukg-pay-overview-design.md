# UKG Pay Overview — design.md比較

Figmaから画面を実装する際に、design.mdに記載する情報の詳しさと、その後の自然言語によるAIへの修正指示が、実装結果にどう影響するかを比較するリポジトリです。

## バージョン

| バージョン | 作成方法・条件 | 実装 | 公開URL |
| --- | --- | --- | --- |
| v1 | CodexでFigma MCPと[design-md-figma](https://github.com/bergside/design-md-figma)プラグインが生成したdesign.mdを使った、手間をかけない（effortlessな）設計・実装。 | [v1ブランチ](https://github.com/taka0330ko/ukg-pay-overview-design.md/tree/v1) | 未記載 |
| v2 | Figma MCPと同プラグインに加え、design.mdに使用ライブラリ・技術スタック・細かなインタラクションの挙動も明記した実装。 | [v2ブランチ](https://github.com/taka0330ko/ukg-pay-overview-design.md/tree/v2) | 未記載 |
| v3 | v2をベースに、自然言語の指示でAIに修正させた実装。 | [v3ブランチ](https://github.com/taka0330ko/ukg-pay-overview-design.md/tree/v3) | 未記載 |

## 比較の目的

- **v1とv2：** design.mdで技術や挙動を詳しく指定した場合に、見た目や動作の再現度がどう変わるかを確認する。
- **v2とv3：** 自然言語による追加の修正指示で、実装がどう改善されるかを確認する。

見た目（レイアウト・余白・文字・色）と、操作時の動作（切り替え・開閉・選択など）を同じ画面条件で比較します。

## ブランチの役割

- `main`：比較の目的・作成条件・各版へのリンクをまとめる案内。
- `v1` / `v2` / `v3`：各バージョンの実装を保存し、個別に公開するためのブランチ。

各実装ブランチにはVercel用の設定を含めています。公開URLはデプロイ確認後に上の表へ追記します。

現時点では、mainにも初回実装のファイルが残っています。比較対象には各バージョンのブランチを使用してください。
