"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: "Brincos" | "Anéis" | "Pulseiras" | "Colares";
  material: "Dourado" | "Prata";
  price: number;
  shape: "earring" | "ring" | "bracelet" | "necklace";
  tone: string;
  isNew?: boolean;
};

const products: Product[] = [
  { id: 1, name: "Argola Aura", category: "Brincos", material: "Dourado", price: 89, shape: "earring", tone: "champagne", isNew: true },
  { id: 2, name: "Anel Horizonte", category: "Anéis", material: "Dourado", price: 119, shape: "ring", tone: "sand" },
  { id: 3, name: "Colar Ponto de Luz", category: "Colares", material: "Prata", price: 139, shape: "necklace", tone: "pearl", isNew: true },
  { id: 4, name: "Pulseira Elo Sereno", category: "Pulseiras", material: "Dourado", price: 109, shape: "bracelet", tone: "linen" },
  { id: 5, name: "Brinco Gota Solar", category: "Brincos", material: "Dourado", price: 98, shape: "earring", tone: "terracotta" },
  { id: 6, name: "Anel Essência", category: "Anéis", material: "Prata", price: 95, shape: "ring", tone: "mist" },
  { id: 7, name: "Colar Trevo", category: "Colares", material: "Dourado", price: 169, shape: "necklace", tone: "olive" },
  { id: 8, name: "Pulseira Riviera", category: "Pulseiras", material: "Prata", price: 129, shape: "bracelet", tone: "stone" },
];

const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

function JewelryArt({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div className={`jewelry-art ${product.tone} ${large ? "large" : ""}`} aria-label={`Representação de ${product.name}`}>
      <span className={`jewel ${product.shape}`} />
      <span className="spark spark-one">✦</span>
      <span className="spark spark-two">·</span>
    </div>
  );
}

export default function Home() {
  const [category, setCategory] = useState("Todos");
  const [material, setMaterial] = useState("Todos");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "Todos" || p.category === category) &&
          (material === "Todos" || p.material === material) &&
          p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, material, query],
  );

  const cartItems = products.filter((p) => cart[p.id]);
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0);

  const addToCart = (product: Product) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }));
    setSelected(null);
    setCartOpen(true);
  };

  const scrollToCatalog = (nextCategory = "Todos") => {
    setCategory(nextCategory);
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main>
      <div className="announcement">
        <span>Frete grátis acima de R$ 299</span>
        <span>•</span>
        <span>6 meses de garantia</span>
      </div>

      <header className="site-header">
        <button className="menu-button" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <a className="brand" href="#">NUBIA’S <i>JOIAS</i></a>
        <nav className={menuOpen ? "open" : ""}>
          <button onClick={() => scrollToCatalog()}>Novidades</button>
          <button onClick={() => scrollToCatalog("Brincos")}>Brincos</button>
          <button onClick={() => scrollToCatalog("Anéis")}>Anéis</button>
          <button onClick={() => scrollToCatalog("Colares")}>Colares</button>
          <button onClick={() => scrollToCatalog("Pulseiras")}>Pulseiras</button>
          <a href="#cuidados" onClick={() => setMenuOpen(false)}>Nossa essência</a>
        </nav>
        <div className="header-actions">
          <button aria-label="Buscar" onClick={() => document.getElementById("busca")?.focus()}>⌕</button>
          <button aria-label="Minha conta">♙</button>
          <button className="bag-button" aria-label={`Sacola com ${cartCount} itens`} onClick={() => setCartOpen(true)}>
            ♧<b>{cartCount}</b>
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">COLEÇÃO ESSÊNCIA • 2026</p>
          <h1>Peças que<br />contam a sua<br /><em>história.</em></h1>
          <p>Semijoias delicadas, feitas para acompanhar todos os seus momentos — do cotidiano ao inesquecível.</p>
          <button className="primary" onClick={() => scrollToCatalog()}>EXPLORAR A COLEÇÃO <span>→</span></button>
          <small>Banho em ouro 18k & prata 925</small>
        </div>
        <div className="hero-visual">
          <div className="portrait">
            <div className="portrait-halo" />
            <div className="portrait-face" />
            <div className="portrait-neck" />
            <div className="portrait-earring">◯</div>
            <div className="portrait-necklace">◇</div>
          </div>
          <div className="hero-note">
            <span>✦</span>
            <p>Beleza que<br />permanece</p>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div><b>✧</b><span><strong>Hipoalergênicas</strong><small>Conforto para a sua pele</small></span></div>
        <div><b>♢</b><span><strong>6 meses de garantia</strong><small>Qualidade que você confia</small></span></div>
        <div><b>↻</b><span><strong>Compra segura</strong><small>Pix ou cartão</small></span></div>
        <div><b>♡</b><span><strong>Atendimento próximo</strong><small>Estamos no WhatsApp</small></span></div>
      </section>

      <section className="categories">
        <div className="section-heading">
          <div><p className="eyebrow">ENCONTRE O SEU BRILHO</p><h2>Escolha por categoria</h2></div>
          <button onClick={() => scrollToCatalog()}>VER TUDO <span>→</span></button>
        </div>
        <div className="category-grid">
          {[
            ["Brincos", "earring", "01"],
            ["Anéis", "ring", "02"],
            ["Colares", "necklace", "03"],
            ["Pulseiras", "bracelet", "04"],
          ].map(([name, shape, number]) => (
            <button className={`category-card cat-${number}`} key={name} onClick={() => scrollToCatalog(name)}>
              <span className={`category-jewel ${shape}`} />
              <small>{number}</small>
              <strong>{name}</strong>
              <i>Descobrir →</i>
            </button>
          ))}
        </div>
      </section>

      <section className="catalog" id="catalogo">
        <div className="section-heading">
          <div><p className="eyebrow">CURADORIA NUBIA’S</p><h2>Joias para todos os dias</h2></div>
          <p className="catalog-intro">Escolhas leves, elegantes e cheias de significado.</p>
        </div>
        <div className="filters">
          <label className="search"><span>⌕</span><input id="busca" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar uma peça..." /></label>
          <div className="filter-row">
            {["Todos", "Brincos", "Anéis", "Colares", "Pulseiras"].map((item) => (
              <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <select aria-label="Filtrar material" value={material} onChange={(e) => setMaterial(e.target.value)}>
            <option>Todos</option><option>Dourado</option><option>Prata</option>
          </select>
        </div>

        {filtered.length ? (
          <div className="product-grid">
            {filtered.map((product) => (
              <article className="product-card" key={product.id}>
                <button className="product-image" onClick={() => setSelected(product)} aria-label={`Ver ${product.name}`}>
                  {product.isNew && <span className="new-label">NOVO</span>}
                  <span className="favorite">♡</span>
                  <JewelryArt product={product} />
                </button>
                <div className="product-info">
                  <p>{product.category} • {product.material}</p>
                  <button onClick={() => setSelected(product)}>{product.name}</button>
                  <div><strong>{money(product.price)}</strong><button aria-label={`Adicionar ${product.name} à sacola`} onClick={() => addToCart(product)}>＋</button></div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state"><span>◇</span><h3>Nenhuma peça encontrada</h3><p>Tente retirar algum filtro ou buscar por outro nome.</p></div>
        )}
      </section>

      <section className="story" id="cuidados">
        <div className="story-art"><span className="story-ring" /><p>✦<br />feito para<br />durar</p></div>
        <div className="story-copy">
          <p className="eyebrow">NOSSA ESSÊNCIA</p>
          <h2>Delicadeza em cada detalhe.</h2>
          <p>Cada peça Nubia’s é escolhida para celebrar sua beleza única. Trabalhamos com materiais de qualidade, acabamento cuidadoso e designs que atravessam estações.</p>
          <div className="care-list">
            <span><b>01</b> Peças hipoalergênicas</span>
            <span><b>02</b> Banho em ouro 18k ou prata 925</span>
            <span><b>03</b> Garantia contra oxidação e defeitos</span>
          </div>
          <a href="#catalogo">CONHECER A NUBIA’S <span>→</span></a>
        </div>
      </section>

      <section className="newsletter">
        <p className="eyebrow">FIQUE POR PERTO</p>
        <h2>Novidades que brilham,<br /><em>direto para você.</em></h2>
        <p>Cadastre seu e-mail e receba lançamentos e condições especiais.</p>
        <form onSubmit={(e) => e.preventDefault()}><input type="email" placeholder="Seu melhor e-mail" aria-label="Seu melhor e-mail" /><button>QUERO RECEBER →</button></form>
      </section>

      <footer>
        <a className="brand" href="#">NUBIA’S <i>JOIAS</i></a>
        <p>Semijoias com afeto, beleza e significado.</p>
        <div className="footer-links"><a href="#catalogo">Catálogo</a><a href="#cuidados">Garantia e cuidados</a><a href="#">Privacidade</a><a href="#">Instagram</a></div>
        <small>© 2026 Nubia’s Joias. Todos os direitos reservados.</small>
      </footer>

      <a className="whatsapp" href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">☏<span>Fale com a gente</span></a>

      {selected && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label={selected.name}>
          <button className="overlay-bg" onClick={() => setSelected(null)} aria-label="Fechar" />
          <div className="product-modal">
            <button className="close" onClick={() => setSelected(null)} aria-label="Fechar">×</button>
            <JewelryArt product={selected} large />
            <div className="modal-copy">
              <p className="eyebrow">{selected.category} • {selected.material}</p>
              <h2>{selected.name}</h2>
              <strong>{money(selected.price)}</strong>
              <p>Uma peça leve e versátil, selecionada para iluminar suas combinações com delicadeza.</p>
              <ul><li>Peça hipoalergênica</li><li>06 meses de garantia</li><li>Envio cuidadoso e seguro</li></ul>
              <button className="primary full" onClick={() => addToCart(selected)}>ADICIONAR À SACOLA</button>
              <a href={`https://wa.me/?text=${encodeURIComponent(`Olá! Tenho uma dúvida sobre ${selected.name}.`)}`} target="_blank" rel="noreferrer">Tirar dúvida sobre esta peça →</a>
            </div>
          </div>
        </div>
      )}

      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <button className="drawer-bg" onClick={() => setCartOpen(false)} aria-label="Fechar sacola" />
        <div className="drawer-panel">
          <div className="drawer-header"><div><p className="eyebrow">SUA SELEÇÃO</p><h2>Sacola <span>({cartCount})</span></h2></div><button onClick={() => setCartOpen(false)}>×</button></div>
          <div className="cart-content">
            {cartItems.length ? cartItems.map((p) => (
              <div className="cart-item" key={p.id}>
                <JewelryArt product={p} />
                <div><small>{p.category} • {p.material}</small><strong>{p.name}</strong><b>{money(p.price)}</b>
                  <div className="quantity"><button onClick={() => setCart((c) => ({...c, [p.id]: Math.max(0, c[p.id]-1)}))}>−</button><span>{cart[p.id]}</span><button onClick={() => setCart((c) => ({...c, [p.id]: c[p.id]+1}))}>＋</button></div>
                </div>
              </div>
            )) : <div className="empty-cart"><span>◇</span><h3>Sua sacola está vazia</h3><p>Encontre uma peça especial para chamar de sua.</p><button onClick={() => {setCartOpen(false); scrollToCatalog();}}>EXPLORAR JOIAS</button></div>}
          </div>
          {cartItems.length > 0 && <div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><small>Frete calculado na próxima etapa</small><button className="primary full" onClick={() => alert("Checkout demonstrativo: conecte as credenciais do Mercado Pago para receber pagamentos reais.")}>IR PARA O CHECKOUT →</button><p>Compra segura • Pix ou cartão</p></div>}
        </div>
      </aside>
    </main>
  );
}
