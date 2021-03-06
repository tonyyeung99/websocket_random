��#   w e b s o c k e t _ r a n d o m  
  
 A   P O C ( P r o o f   o f   C o n c e p t )   f o r   w e b   U I   d i s p l a y i n g   s t e a m i n g   d a t a .   I n   t h e   f u t u r e ,   I   m i g h t   m i g r a t e   t h e   e x i s t i n g   t r a d i n g   p l a t f o r m   U I   f r o m   C #   t o   W e b   t e c h n o l o g y .  
  
 D e s c r i o p t i o n :  
 U s i n g   W e b   t e c h n o l o g i e s   m a k e   a   w e b   G U I   t h a t   d i s p l a y s   r a n d o m   n u m b e r s   g e n e r a t e d   b y   a   P y t h o n   S e r v e r .   T h e   s e r v e r   s h o u l d   g e n e r a t e   t h e   n u m b e r s   d i s p l a y e d   b y   t h e   W e b   G U I .   T h e   P y t h o n   s e r v e r   s h o u l d   b e   a b l e   t o   g e n e r a t e   n u m b e r s   a t   a   s e t t a b l e   f r e q u e n c y .  
  
 T h e   W e b   G U I   c o u l d   s h o w   o n l y   t h e   l a s t   5 0   n u m b e r s   g e n e r a t e d   n u m b e r s .   T h e   G U I   c o l o r i z e   t h e   c e l l s   R e d   i f   t h e   n u m b e r   i s   b e l o w   a   G U I   s e t t a b l e   v a l u e   o r   g r e e n   i f   i t   i s   h i g h e r   t h a n   t h e   s e t   v a l u e .  
  
 [ D e m o   U R L ]  
http://ec2-52-221-196-39.ap-southeast-1.compute.amazonaws.com:8888
  
 [ A s s u m p t i o n   &   L i m i t a t i o n ]  
 1 .     T h e   r a n d o m   n u m b e r   g e n e r a t e d   r a n g e   f r o m   1   ~   1 0 0  
 2 .     I f   n u m b e r   i s   l a r g e r   t h a n   o r   e q u a l   t o   8 0 ,   t h e   c o l o r   o f   t h e   c e l l   w i l l   c h a n g e   t o   r e d  
 3 .     I f   n u m b e r   i s   s m a l l e r   t h a n   o r   e q u a l   t o   2 0 ,   t h e   c o l o r   o f   t h e   c e l l   w i l l   c h a n g e   t o   g r e e n  
 4 .     T h e   r e n d e r i n g   i n t e r v a l   i n   t h e   U I   i s   f i x e d   a t   2 0 0 0   m s ,   i . e .   r e n d e r   e v e r y   2 0 0 0   m s  
 5 .     U s e r   c o u l d   n o t   s e t   t h e   f r e q u e n c y   o f   t h e   s e r v e r   g e n e r a t i n g   n u m b e r s   t o o   s l o w . ( i . e .   T h e   i n t e r v a l   c o u l d   n o t   l a r g e r   t h a n   1 0   s e c o n d )  
  
 [ T e c h n o l g i e s   U s e d ]  
 F r o n t e n d :  
 - S P A ( S i n g l e   P a g e   A p p l i c a t i o n )  
 - W e b s o c k e t s   C l i e n t  
 - M V V M   M o d e l  
 - C u s t o m   D i r e c t i v e  
 - A s y n c h r o n o u s   P r o g r a m m i n g  
  
 B a c k e n d :  
 - W e b s o c k e t   S e r v e r  
 - R o u t i n g  
 - A s y n c h r o n o u s   E v e n t  
  
 [ F r a m e w o r k ]  
 F r o n t e n d :  
 - A n g u l a r J S  
 - C S S   S t y l e s h e e t  
 B a c k e n d :  
 - F l a s k  
 - F l a s k - S o c k e t I O  
  
 [ I n s t a l l i n g   D e p e n d e n c i e s ]  
 p i p   i n s t a l l   - r   r e q u i r e m e n t s . t x t  
  
 [ R u n n i n g   t h e   S e r v e r ]  
 p y t h o n   r a n d o m _ v i e w e r . p y  
  
 [ R u n n i n g   t h e   C l i e n t ]  
 O p e n   t h e   U R L :   h t t p : / / 1 2 7 . 0 . 0 . 1 : 8 8 8 8 /  
  
 [ T o   D o   L i s t ]  
 -   A d d   A u t o - t e s t i n g   C a s e s  
 -   A d d   t h e   f e a t u r e s   o f   s e t t a b l e   t h r e s h o l d   v a l u e s   f o r   d i s p l a y i n g   " R e d "   o r   " G r e e n "   c o l o r   c e l l s  
 
