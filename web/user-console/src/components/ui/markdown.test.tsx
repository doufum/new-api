import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Markdown } from './markdown'

const markdown = `
# 标题

这是 **加粗** 文本，包含 \`inline\` 代码。

\`\`\`ts
const answer = 42
\`\`\`

| 功能 | 状态 |
| --- | --- |
| 文档 | 正常 |

[外部链接](https://example.com)
[内部链接](/workspace/keys)
`

describe('Markdown', () => {
  it('renders styled markdown nodes and preserves internal links', () => {
    render(<Markdown>{markdown}</Markdown>)

    expect(screen.getByRole('heading', { name: '标题', level: 1 })).toHaveClass(
      'text-3xl'
    )
    expect(screen.getByText('加粗', { selector: 'strong' })).toHaveClass(
      'font-semibold'
    )
    expect(screen.getByText('inline', { selector: 'code' })).toHaveClass(
      'bg-muted'
    )

    const codeBlock = screen.getByText('const answer = 42')
    expect(codeBlock.closest('pre')).toHaveClass('overflow-x-auto')

    const table = screen.getByRole('table')
    expect(table.parentElement).toHaveClass('overflow-x-auto')

    const externalLink = screen.getByRole('link', { name: '外部链接' })
    expect(externalLink).toHaveAttribute('target', '_blank')
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer')

    const internalLink = screen.getByRole('link', { name: '内部链接' })
    expect(internalLink).not.toHaveAttribute('target')
  })
})
