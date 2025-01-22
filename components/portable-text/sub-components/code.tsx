import Refractor from 'react-refractor';
import js from 'refractor/lang/javascript';
import typescript from 'refractor/lang/typescript';
import tsx from 'refractor/lang/tsx';
import { ISanityCode } from '@/backend/sanity/fragments/root/common';
import { RefractorSyntax } from 'refractor';

// Sanity backend is currently using only these three coding languages
Refractor.registerLanguage(js);
Refractor.registerLanguage(typescript);
Refractor.registerLanguage(tsx);

interface Props {
  code: ISanityCode;
}

export default function CodeElement({ code }: Props) {
  /**
   * ISSUE: Sanity code block does not set a language value by default.
   * We have set 'typescript' as default language in sanity.
   */
  if (!code.language) {
    return (
      <Refractor
        language={'typescript'}
        value={code.code}
        markers={code.highlightedLines}
      />
    );
  }

  let language: RefractorSyntax | undefined = undefined;

  switch (code.language) {
    case 'typescript':
      language = typescript;
      break;
    case 'javascript':
      language = js;
      break;
    case 'tsx':
      language = tsx;
      break;
  }

  if (language && Refractor.hasLanguage(language)) {
    return (
      <Refractor
        language={code.language}
        value={code.code}
        markers={code.highlightedLines}
      />
    );
  } else {
    return (
      <div className="rounded-5 bg-warning p-4">
        <b>Language not supported!</b>
      </div>
    );
  }
}
