import "./Wishlist.css"
import { useWishlist } from "../../context/WishlistContext";
import { useTranslation } from "../../hooks/useTranslations";
import ProductCard from "../../components/Home/ProductsSection/ProductCard/ProductCard";
import CircleLoader from "../../components/Common/Loaders/CircleLoader/CircleLoader";
import { motion, AnimatePresence } from "framer-motion";

export default function Wishlist() {
    const { wishlist, loading } = useWishlist();
    const { t } = useTranslation();

    return (
        <AnimatePresence mode="wait">
            <motion.div 
                className="wishlist-main-container"
                key="wishlist"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.6, 0.05, 0.55, 1] }}>
                    {loading ? (
                        <div className="wishlist-loading-container">
                            <CircleLoader classAdd="circle-loader-local-use" />
                        </div>
                    ) : wishlist.length > 0 ? (
                        wishlist.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))
                    ) : (
                        <p className="wishlist-empty-message text-center">{t('wishlist_empty_message')}</p>
                    )}
            </motion.div>
        </AnimatePresence>
    )
}
